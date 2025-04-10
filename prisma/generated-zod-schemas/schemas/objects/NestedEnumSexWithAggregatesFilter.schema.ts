import { z } from 'zod';
import { SexSchema } from '../enums/Sex.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumSexFilterObjectSchema } from './NestedEnumSexFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumSexWithAggregatesFilter> = z
  .object({
    equals: z.lazy(() => SexSchema).optional(),
    in: z
      .union([z.lazy(() => SexSchema).array(), z.lazy(() => SexSchema)])
      .optional(),
    notIn: z
      .union([z.lazy(() => SexSchema).array(), z.lazy(() => SexSchema)])
      .optional(),
    not: z
      .union([
        z.lazy(() => SexSchema),
        z.lazy(() => NestedEnumSexWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumSexFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumSexFilterObjectSchema).optional(),
  })
  .strict();

export const NestedEnumSexWithAggregatesFilterObjectSchema = Schema;
