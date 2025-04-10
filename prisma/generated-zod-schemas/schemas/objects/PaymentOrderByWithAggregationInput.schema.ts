import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { PaymentCountOrderByAggregateInputObjectSchema } from './PaymentCountOrderByAggregateInput.schema';
import { PaymentAvgOrderByAggregateInputObjectSchema } from './PaymentAvgOrderByAggregateInput.schema';
import { PaymentMaxOrderByAggregateInputObjectSchema } from './PaymentMaxOrderByAggregateInput.schema';
import { PaymentMinOrderByAggregateInputObjectSchema } from './PaymentMinOrderByAggregateInput.schema';
import { PaymentSumOrderByAggregateInputObjectSchema } from './PaymentSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentOrderByWithAggregationInput> = z
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
    _count: z
      .lazy(() => PaymentCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z.lazy(() => PaymentAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => PaymentMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => PaymentMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => PaymentSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const PaymentOrderByWithAggregationInputObjectSchema = Schema;
