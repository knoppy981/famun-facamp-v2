import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentSumOrderByAggregateInput> = z
  .object({
    amount: z.lazy(() => SortOrderSchema).optional(),
    delegatesPayments: z.lazy(() => SortOrderSchema).optional(),
    advisorsPayments: z.lazy(() => SortOrderSchema).optional(),
    discount: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const PaymentSumOrderByAggregateInputObjectSchema = Schema;
