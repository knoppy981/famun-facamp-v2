import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { AdminCountOrderByAggregateInputObjectSchema } from './AdminCountOrderByAggregateInput.schema';
import { AdminMaxOrderByAggregateInputObjectSchema } from './AdminMaxOrderByAggregateInput.schema';
import { AdminMinOrderByAggregateInputObjectSchema } from './AdminMinOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AdminOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    hash: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => AdminCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z.lazy(() => AdminMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => AdminMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const AdminOrderByWithAggregationInputObjectSchema = Schema;
