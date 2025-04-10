import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { DelegationOrderByWithRelationInputObjectSchema } from './DelegationOrderByWithRelationInput.schema';
import { UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    amount: z.lazy(() => SortOrderSchema).optional(),
    currency: z.lazy(() => SortOrderSchema).optional(),
    delegatesPayments: z.lazy(() => SortOrderSchema).optional(),
    advisorsPayments: z.lazy(() => SortOrderSchema).optional(),
    paymentMethod: z.lazy(() => SortOrderSchema).optional(),
    receiptUrl: z.lazy(() => SortOrderSchema).optional(),
    accepted: z.lazy(() => SortOrderSchema).optional(),
    isFake: z.lazy(() => SortOrderSchema).optional(),
    stripeCheckoutSessionId: z.lazy(() => SortOrderSchema).optional(),
    stripePaymentIntentId: z.lazy(() => SortOrderSchema).optional(),
    coupon: z.lazy(() => SortOrderSchema).optional(),
    discount: z.lazy(() => SortOrderSchema).optional(),
    delegationId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    delegation: z
      .lazy(() => DelegationOrderByWithRelationInputObjectSchema)
      .optional(),
    user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  })
  .strict();

export const PaymentOrderByWithRelationInputObjectSchema = Schema;
