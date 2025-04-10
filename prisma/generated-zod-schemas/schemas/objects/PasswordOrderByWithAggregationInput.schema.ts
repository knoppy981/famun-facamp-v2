import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { PasswordCountOrderByAggregateInputObjectSchema } from './PasswordCountOrderByAggregateInput.schema';
import { PasswordMaxOrderByAggregateInputObjectSchema } from './PasswordMaxOrderByAggregateInput.schema';
import { PasswordMinOrderByAggregateInputObjectSchema } from './PasswordMinOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PasswordOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    hash: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => PasswordCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z.lazy(() => PasswordMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => PasswordMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const PasswordOrderByWithAggregationInputObjectSchema = Schema;
