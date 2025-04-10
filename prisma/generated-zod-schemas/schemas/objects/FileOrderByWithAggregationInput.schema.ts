import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { FileCountOrderByAggregateInputObjectSchema } from './FileCountOrderByAggregateInput.schema';
import { FileAvgOrderByAggregateInputObjectSchema } from './FileAvgOrderByAggregateInput.schema';
import { FileMaxOrderByAggregateInputObjectSchema } from './FileMaxOrderByAggregateInput.schema';
import { FileMinOrderByAggregateInputObjectSchema } from './FileMinOrderByAggregateInput.schema';
import { FileSumOrderByAggregateInputObjectSchema } from './FileSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FileOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    url: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    fileName: z.lazy(() => SortOrderSchema).optional(),
    stream: z.lazy(() => SortOrderSchema).optional(),
    contentType: z.lazy(() => SortOrderSchema).optional(),
    size: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => FileCountOrderByAggregateInputObjectSchema).optional(),
    _avg: z.lazy(() => FileAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => FileMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => FileMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => FileSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const FileOrderByWithAggregationInputObjectSchema = Schema;
