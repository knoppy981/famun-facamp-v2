import { z } from 'zod';
import { DelegationArgsObjectSchema } from './DelegationArgs.schema';
import { UserArgsObjectSchema } from './UserArgs.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentSelect> = z
  .object({
    id: z.boolean().optional(),
    amount: z.boolean().optional(),
    currency: z.boolean().optional(),
    delegatesPayments: z.boolean().optional(),
    advisorsPayments: z.boolean().optional(),
    paymentMethod: z.boolean().optional(),
    receiptUrl: z.boolean().optional(),
    accepted: z.boolean().optional(),
    isFake: z.boolean().optional(),
    stripeCheckoutSessionId: z.boolean().optional(),
    stripePaymentIntentId: z.boolean().optional(),
    coupon: z.boolean().optional(),
    discount: z.boolean().optional(),
    delegation: z
      .union([z.boolean(), z.lazy(() => DelegationArgsObjectSchema)])
      .optional(),
    delegationId: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    userId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
  })
  .strict();

export const PaymentSelectObjectSchema = Schema;
