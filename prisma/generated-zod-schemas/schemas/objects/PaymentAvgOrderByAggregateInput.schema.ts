import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentAvgOrderByAggregateInput> = z
  .object({
    amount: z.lazy(() => SortOrderSchema).optional(),
    delegatesPayments: z.lazy(() => SortOrderSchema).optional(),
    advisorsPayments: z.lazy(() => SortOrderSchema).optional(),
    discount: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const PaymentAvgOrderByAggregateInputObjectSchema = Schema;
