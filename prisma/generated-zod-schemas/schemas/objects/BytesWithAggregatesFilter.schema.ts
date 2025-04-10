import { z } from 'zod';
import { NestedBytesWithAggregatesFilterObjectSchema } from './NestedBytesWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedBytesFilterObjectSchema } from './NestedBytesFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.BytesWithAggregatesFilter> = z
  .object({
    equals: z.instanceof(Buffer).optional(),
    in: z
      .union([z.instanceof(Buffer).array(), z.instanceof(Buffer)])
      .optional(),
    notIn: z
      .union([z.instanceof(Buffer).array(), z.instanceof(Buffer)])
      .optional(),
    not: z
      .union([
        z.instanceof(Buffer),
        z.lazy(() => NestedBytesWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedBytesFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedBytesFilterObjectSchema).optional(),
  })
  .strict();

export const BytesWithAggregatesFilterObjectSchema = Schema;
