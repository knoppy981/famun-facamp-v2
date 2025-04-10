import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    amount: z.literal(true).optional(),
    currency: z.literal(true).optional(),
    delegatesPayments: z.literal(true).optional(),
    advisorsPayments: z.literal(true).optional(),
    paymentMethod: z.literal(true).optional(),
    receiptUrl: z.literal(true).optional(),
    accepted: z.literal(true).optional(),
    isFake: z.literal(true).optional(),
    stripeCheckoutSessionId: z.literal(true).optional(),
    stripePaymentIntentId: z.literal(true).optional(),
    coupon: z.literal(true).optional(),
    discount: z.literal(true).optional(),
    delegationId: z.literal(true).optional(),
    userId: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const PaymentCountAggregateInputObjectSchema = Schema;
