import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentCreateManyUserInput> = z
  .object({
    id: z.string().optional(),
    amount: z.number(),
    currency: z.string(),
    delegatesPayments: z.number(),
    advisorsPayments: z.number(),
    paymentMethod: z.string(),
    receiptUrl: z.string(),
    accepted: z.boolean().optional(),
    isFake: z.boolean().optional().nullable(),
    stripeCheckoutSessionId: z.string().optional().nullable(),
    stripePaymentIntentId: z.string().optional().nullable(),
    coupon: z.string().optional().nullable(),
    discount: z.number().optional().nullable(),
    delegationId: z.string(),
    createdAt: z.coerce.date().optional(),
  })
  .strict();

export const PaymentCreateManyUserInputObjectSchema = Schema;
