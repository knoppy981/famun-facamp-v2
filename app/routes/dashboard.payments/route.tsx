import React from 'react'
import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData, useSubmit, useActionData, useNavigation, useSearchParams, Link } from '@remix-run/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import "~/lib/zod-error-map"
import { z } from "zod"

import { requireUser } from '~/session.server'
import { checkDelegationPayments } from '~/models/delegation.server'
import { checkCoupon, createCheckoutSession } from '~/stripe.server'
import { getPaymentsByUserId } from '~/models/payments.server'
import { cn, mapValue, useUser } from '~/lib/utils'

import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { AlertCircle, AlertTriangle, Check, ExternalLink, Info } from 'lucide-react'
import SelectPaymentsDialog from './payments-dialog'


export const paymentSelectFormSchema = z.object({
  delegatesPayments: z.coerce
    .number(),
  advisorsPayments: z.coerce
    .number(),
  coupon: z.string()
    .optional(),
}).refine(data => data.delegatesPayments > 0 || data.advisorsPayments > 0, {
  message: "Selecione pelo menos 1 pagamento",
  path: ["delegatesPayments"],
});

export type PaymentSelectDataType = z.infer<typeof paymentSelectFormSchema>


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireUser(request)

  const delegationPaymentStatus = await checkDelegationPayments(user.delegationId)
  const userPayments = await getPaymentsByUserId(user.id)

  if (!delegationPaymentStatus) throw new Error("asdasdasdasd")

  return json({ delegationPaymentStatus, userPayments })
}


export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await requireUser(request)
  const formData = await request.formData();
  const delegatesPayments = Number(formData.get("delegatesPayments") as string);
  const advisorsPayments = Number(formData.get("advisorsPayments") as string);
  const coupon = formData.get("coupon") as string;

  const delegationPaymentStatus = await checkDelegationPayments(user.delegationId)
  if (!delegationPaymentStatus || delegationPaymentStatus.status !== "pending") throw new Error("asdasdasdasd")

  const result = paymentSelectFormSchema.safeParse({ delegatesPayments, advisorsPayments, coupon });
  if (!result.success) {
    return json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  if (advisorsPayments > delegationPaymentStatus?.advisors.remaining) {
    return json({ errors: { "advisorsPayments": "Número máximo de pagamentos atingido" } }, { status: 400 });
  } else if (delegatesPayments > delegationPaymentStatus?.delegates.remaining) {
    return json({ errors: { "delegatesPayments": "Número máximo de pagamentos atingido" } }, { status: 400 });
  }

  const payments: { price: string; quantity: number }[] = []

  if (delegatesPayments > 0) {
    payments.push({
      price: process.env.STRIPE_PROD_DELEGADO as string,
      quantity: delegatesPayments
    })
  }

  if (advisorsPayments > 0) {
    payments.push({
      price: process.env.STRIPE_PROD_ADVISOR as string,
      quantity: advisorsPayments
    })
  }

  if (payments.length === 0) {
    return json({ errors: { "delegatesPayments": "Selecione pelo menos 1 pagamento" } }, { status: 400 })
  }

  if (typeof coupon === "string" && coupon.trim() !== "") {
    try {
      await checkCoupon(coupon);
    } catch (error) {
      return json({ errors: { coupon: "Cupom inválido" } }, { status: 400 });
    }
  }

  const session = await createCheckoutSession({
    payments,
    delegatesPayments,
    advisorsPayments,
    user,
    coupon: coupon
  });

  if (!session.url) {
    return json({ errors: { "stripe": "Erro com o servidor de pagamentos, tente novamente mais tarde" } }, { status: 400 })
  }

  return redirect(session.url)
}


export default function Payments() {
  const { delegationPaymentStatus, userPayments } = useLoaderData<typeof loader>()
  const user = useUser()
  const navigation = useNavigation();
  const actionData = useActionData()
  const { form, onSubmit } = useSelectPaymentForm(actionData)
  const { isDialogOpen, toggleDialog, dialogState } = usePaymentReturnDialog()
  const [isSelectPaymentsDialogOpen, setIsSelectPaymentsDialogOpen] = React.useState(false)

  return (
    <div className='space-y-12'>
      <p className='text-sm italic text-muted-foreground'>
        Observações:<br />
        1. Garantia das vagas<br />
        Para garantir suas vagas no FAMUN {new Date().getFullYear()}, a delegação deve realizar o pagamento de TODOS(AS) OS(AS) PARTICIPANTES (delegados(as) e Professores(as) Orientadores(as)) em até 7 dias corridos, a contar da data da inscrição.<br />
        Caso os pagamentos não sejam realizados nesse período, a inscrição será cancelada e a delegação deverá realizar uma nova inscrição, caso deseje participar da conferência. A nova inscrição dependerá da disponibilidade de vagas.<br />
        2. Formas de pagamento<br />
        Os pagamentos podem ser feitos individualmente por cada participante; ou os Professores Orientadores e Head Delegates podem pagar a inscrição de todos(as) os(as) delegados(as). A delegação pode escolher a forma que melhor lhe convier.<br />
        Pagamento via cartão de crédito ou boleto: clique em “Pagar” abaixo. O próprio sistema gerará o recibo e você receberá um e-mail.<br />
        Pagamento via PIX: pague o valor correspondente à sua taxa de inscrição usando a Chave PIX: famun@facamp.com.br. Após terminar a transição, anexe o comprovante do PIX na aba “Documentos”. Salve o comprovante com o nome da delegação correspondente ao pagamento.<br />
        ATENÇÃO:  o FAMUN {new Date().getFullYear()} não realiza reembolso ou ressarcimento das taxas de inscrição, sob nenhuma circunstância.
      </p>

      <div className='flex flex-col gap-8 items-start'>
        <div
          className={cn(
            "flex flex-col gap-8 items-start",
            "lg:max-w-[50%] md:max-w-[60%] sm:max-w-full p-6 bg-accent rounded-xl",
            "shadow-[0px_1px_0px_0px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_rgba(0,0,0,.1),0px_2px_2px_0px_rgba(0,0,0,.1),0px_4px_4px_0px_rgba(0,0,0,.1),0px_8px_8px_0px_rgba(0,0,0,.1)]",
          )}
        >
          {delegationPaymentStatus.status === "pending" &&
            <p>Para pagar as inscrições clique no botão para pagar e siga as instruções</p>
          }

          {delegationPaymentStatus.status === "paid" &&
            <p>
              Todos os pagamentos foram realizados com sucesso, para continuar com a sua inscrição siga para a página de
              <Button asChild variant="link" className="px-1 py-0 h-auto text-base">
                <Link to="/dashboard/participants">participantes</Link>
              </Button>
            </p>
          }

          {delegationPaymentStatus.status === "expired" && delegationPaymentStatus.totalNumberPayments === 0 &&
            <div className='space-y-4'>
              <p>O tempo para pagar a inscrição da sua equipe expirou!</p>
              <p>Se ainda tiver interesse em participar, entre em contato com a nosso suporte através do e-mail: famun@facamp.com.br</p>
            </div>
          }

          {delegationPaymentStatus.status === "expired" && delegationPaymentStatus.totalNumberPayments > 0 &&
            <div className='space-y-4'>
              <p>O tempo para pagar a inscrição do resto da sua equipe expirou!</p>
              <p>Somente os participantes pagos poderão participar, para continuar siga para a página de
                <Button asChild variant="link" className="px-1 py-0 h-auto text-base">
                  <Link to="/dashboard/participants">participantes</Link>
                </Button>
              </p>
              <p> Se ainda tiver interesse em pagar o restante para que eles possam participar, entre em contato com a nosso suporte através do e-mail: famun@facamp.com.br</p>
            </div>
          }
        </div>

        <span className='flex gap-3 items-center px-2'>
          {delegationPaymentStatus.delegates.remaining > 0 ?
            <>
              <AlertCircle className="size-5 text-warning" />
              Ainda faltam {delegationPaymentStatus.delegates.remaining} inscrições de delegados a serem pagas
            </> :
            <>
              <Check className="size-5 text-positive" />
              Todas as inscrições ({user.delegation.maxDelegates}) de delegados foram pagas
            </>
          }
        </span>

        <span className='flex gap-3 items-center px-2'>
          {delegationPaymentStatus.advisors.remaining > 0 ?
            <>
              <AlertCircle className="size-5 text-warning" />
              Ainda faltam {delegationPaymentStatus.advisors.remaining} inscrições de advisors a serem pagas
            </> :
            <>
              <Check className="size-5 text-positive" />
              Todas as inscrições ({user.delegation.maxAdvisors}) de advisors foram pagas
            </>
          }
        </span>

        {delegationPaymentStatus.status === "pending" ?
          <div className='flex flex-col gap-8 items-stretch'>
            <Button size="xl" className='w-full' onClick={() => setIsSelectPaymentsDialogOpen(true)}>
              Pagar
            </Button>

            <SelectPaymentsDialog
              delegationPaymentStatus={delegationPaymentStatus}
              isDialogOpen={isSelectPaymentsDialogOpen}
              setIsDialogOpen={setIsSelectPaymentsDialogOpen}
            />

            <Alert>
              <AlertTriangle className="size-5" />
              <AlertTitle>Aviso!</AlertTitle>
              <AlertDescription>
                Os pagamentos deveram ser realizados até {new Date(user.delegation.paymentExpirationDate).toLocaleDateString("pt-BR")}
              </AlertDescription>
            </Alert>
          </div>
          :
          null
        }
      </div>

      {userPayments.length > 0 ?
        <div className='space-y-8'>
          <div>
            Histórico de Pagamentos
          </div>

          <Table>
            <TableCaption>Lista de pagamentos realizados.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Pagamento</TableHead>
                <TableHead className="w-[100px]">Valor</TableHead>
                <TableHead>Recibo</TableHead>
                <TableHead>Método de Pagamento</TableHead>
                <TableHead className="text-right">Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userPayments.map((payment, index) => {
                const paymentsCount = payment.delegatesPayments + payment.advisorsPayments

                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className='flex items-center gap-4 truncate'>
                        Inscrição de {paymentsCount ? ` ${paymentsCount}x participante${paymentsCount as number > 1 ? "s" : ""}` : ''}

                        <Popover>
                          <PopoverTrigger>
                            <Info className='size-5' />
                          </PopoverTrigger>

                          <PopoverContent className='w-[90vw] md:w-72'>
                            {payment.delegatesPayments > 0 ? <>{payment.delegatesPayments} Pagamentos de Delegado{payment.delegatesPayments > 1 ? "s" : ""}<br /></> : <></>}
                            {payment.advisorsPayments > 0 ? <>{payment.advisorsPayments} Pagamentos de Advisor{payment.advisorsPayments > 1 ? "s" : ""}</> : <></>}
                          </PopoverContent>
                        </Popover>
                      </div>
                    </TableCell>

                    <TableCell>{(payment.amount / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} </TableCell>

                    <TableCell>
                      <Button asChild variant="link" className='p-0'>
                        <a className='h-auto px-0 py-0' href={payment.receiptUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className='size-4' />
                          Recibo
                        </a>
                      </Button>
                    </TableCell>

                    <TableCell>{mapValue(payment.paymentMethod)}</TableCell>

                    <TableCell className="text-right">{new Date(payment.createdAt).toLocaleDateString("pt-BR")}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
        :
        null
      }

      <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogState.title}
            </DialogTitle>
          </DialogHeader>
          {dialogState.message}
        </DialogContent>
      </Dialog>
    </div>
  )
}


function useSelectPaymentForm(actionData: any) {
  const submit = useSubmit()
  const form = useForm<z.infer<typeof paymentSelectFormSchema>>({
    resolver: zodResolver(paymentSelectFormSchema),
    defaultValues: {
      delegatesPayments: 0,
      advisorsPayments: 0,
      coupon: ""
    },
  })

  React.useEffect(() => {
    if (actionData?.errors) {
      // Set server errors in form state
      Object.keys(actionData.errors).forEach((field) => {
        form.setError(field as "delegatesPayments" | "advisorsPayments" | "coupon", {
          type: "server",
          message: actionData.errors?.[field],
        })
        form.setFocus(field as "delegatesPayments" | "advisorsPayments" | "coupon")
      })
    }
  }, [actionData, form])

  function onSubmit(values: z.infer<typeof paymentSelectFormSchema>) {
    submit(values, { method: "POST" })
  }

  return { form, onSubmit }
}


function usePaymentReturnDialog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [dialogState, setDialogState] = React.useState({
    message: <></>,
    title: ""
  })

  React.useEffect(() => {
    if (searchParams.get("success") === "false") {
      setIsDialogOpen(true)
      setDialogState({
        message: <>
          Parece que algo deu errado, se precisar entrar em contato com o suporte mande um e-mail para famun@facamp.com.br.
        </>,
        title: "O Pagamento não deu certo :(",
      })
    } else if (searchParams.get("success") === "true") {
      setIsDialogOpen(true)
      setDialogState({
        message: <>
          O pagamento foi realizado com sucesso, você receberá um e-mail confirmando o pagamento.<br /><br />
          Caso a página não atualize imediatamente, espere alguns minutos e atualize a página.<br /><br />
          Se você não receber o e-mail, entre em contato com o suporte.
        </>,
        title: "Pagamento concluído",
      })
    }
  }, [])

  const toggleDialog = (open: boolean) => {
    setIsDialogOpen(open)

    if (open === false) {
      setSearchParams(new URLSearchParams())
    }
  }

  return { isDialogOpen, toggleDialog, dialogState }
}