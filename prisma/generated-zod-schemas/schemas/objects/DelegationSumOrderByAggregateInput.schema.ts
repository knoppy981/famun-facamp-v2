import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationSumOrderByAggregateInput> = z
  .object({
    maxDelegates: z.lazy(() => SortOrderSchema).optional(),
    maxAdvisors: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const DelegationSumOrderByAggregateInputObjectSchema = Schema;
