import { z } from 'zod';
import { DietSchema } from '../enums/Diet.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumDietNullableFilterObjectSchema } from './NestedEnumDietNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumDietNullableWithAggregatesFilter> = z
  .object({
    equals: z
      .lazy(() => DietSchema)
      .optional()
      .nullable(),
    in: z
      .union([z.lazy(() => DietSchema).array(), z.lazy(() => DietSchema)])
      .optional()
      .nullable(),
    notIn: z
      .union([z.lazy(() => DietSchema).array(), z.lazy(() => DietSchema)])
      .optional()
      .nullable(),
    not: z
      .union([
        z.lazy(() => DietSchema),
        z.lazy(() => NestedEnumDietNullableWithAggregatesFilterObjectSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumDietNullableFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumDietNullableFilterObjectSchema).optional(),
    isSet: z.boolean().optional(),
  })
  .strict();

export const NestedEnumDietNullableWithAggregatesFilterObjectSchema = Schema;
