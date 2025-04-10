import { z } from 'zod';

export const PaymentScalarFieldEnumSchema = z.enum([
  'id',
  'amount',
  'currency',
  'delegatesPayments',
  'advisorsPayments',
  'paymentMethod',
  'receiptUrl',
  'accepted',
  'isFake',
  'stripeCheckoutSessionId',
  'stripePaymentIntentId',
  'coupon',
  'discount',
  'delegationId',
  'userId',
  'createdAt',
]);
