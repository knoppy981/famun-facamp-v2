import Stripe from "stripe";
import { prisma } from "./db.server";
import { User } from "./models/user.server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type CheckoutSessionMetadata = {
  userId: string;
  delegationId: string;
  delegatesPayments: number;
  advisorsPayments: number;
}

export async function createCheckoutSession({
  payments,
  delegatesPayments,
  advisorsPayments,
  user,
  coupon
}: {
  payments: { price: string, quantity: number }[];
  delegatesPayments: number;
  advisorsPayments: number;
  user: User;
  coupon?: string
}): Promise<Stripe.Checkout.Session> {
  const { WEBSITE_URL } = process.env;

  return await stripe.checkout.sessions.create({
    line_items: payments,
    mode: "payment",
    customer: user.stripeCustomerId,
    metadata: {
      delegationId: user.delegationId,
      userId: user.id,
      delegatesPayments,
      advisorsPayments
    } as CheckoutSessionMetadata,
    success_url: `${WEBSITE_URL}/dashboard/payments?${new URLSearchParams({ success: "true" })}`,
    cancel_url: `${WEBSITE_URL}/dashboard/payments?${new URLSearchParams({ success: "false" })}`,
    discounts: coupon ? [{ coupon }] : undefined
  });
}


export async function getOrCreateCustomer(email: string): Promise<string> {
  // Search for an existing customer by email using the Stripe search API
  const searchResult = await stripe.customers.search({
    query: `email:\'${email}\'`,
  });

  if (searchResult.data.length > 0) {
    // Return the ID of the existing customer if found
    return searchResult.data[0].id;
  }

  // Otherwise, create a new customer with the provided email
  const customer = await stripe.customers.create({ email });
  return customer.id;
}


export async function checkCoupon(couponId: string) {
  return stripe.coupons.retrieve(couponId);
}


export async function getPaymentIntentById(paymentIntentId: string, expand?: string[]): Promise<Stripe.PaymentIntent> {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, expand ? { expand } : undefined);
  return paymentIntent;
}


export async function handleWebHook(request: Request) {
  // stripe listen --forward-to localhost:5173/api/stripewebhook

  const payload = await request.text()
  const sig: any = request.headers.get("stripe-signature")
  let event

  if (typeof process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET === 'undefined') {
    throw new Error('stripe webhook secret is not defined in the environment variables');
  }

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET
    ) as Stripe.Event;
  } catch (err: any) {
    console.log(err);
    return new Response(JSON.stringify({ errors: { message: err.message } }), { status: err.statusCode });
  }

  if (event.type == 'checkout.session.completed') {
    console.dir(event, { depth: null })
    const {
      id: stripeCheckoutSessionId,
      metadata: _metadata,
      customer,
      customer_details: CustomerDetails,
      amount_total: totalAmount,
      currency,
      payment_intent: stripePaymentIntentId,
      discounts
    } = event.data.object as Stripe.Checkout.Session;
    const metadata: CheckoutSessionMetadata = _metadata as any

    const advisorsPayments = Number(metadata.advisorsPayments)
    const delegatesPayments = Number(metadata.delegatesPayments)

    if (!customer || !stripePaymentIntentId) return

    const paymentIntent = await getPaymentIntentById(stripePaymentIntentId as string, ["latest_charge"])
    const lastCharge = paymentIntent.latest_charge as Stripe.Charge
    console.dir(paymentIntent, { depth: null })

    await prisma.payment.create({
      data: {
        amount: totalAmount ?? 0,
        currency: currency ?? "BRL",
        accepted: true,
        advisorsPayments,
        delegatesPayments,
        paymentMethod: lastCharge.payment_method_details?.type ?? "",
        isFake: false,
        stripeCheckoutSessionId,
        stripePaymentIntentId: stripePaymentIntentId as string,
        receiptUrl: lastCharge.receipt_url ?? "",

        delegation: {
          connect: {
            id: metadata.delegationId,
          }
        },
        user: {
          connect: {
            id: metadata.userId
          }
        }
      }
    })

    /* const info = await sendEmail({
      to: user.email,
      subject: `FAMUN ${new Date().getFullYear()}: Pagamento confirmado`,
      html: paymentCompletedEmail(user.name, paidUsers, new Date(event.data.object.created * 1000).toLocaleDateString("pt-BR"))
    }) */
  }

  return {}
}