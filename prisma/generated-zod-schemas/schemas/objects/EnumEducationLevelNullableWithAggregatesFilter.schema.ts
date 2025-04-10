import { z } from 'zod';
import { EducationLevelSchema } from '../enums/EducationLevel.schema';
import { NestedEnumEducationLevelNullableWithAggregatesFilterObjectSchema } from './NestedEnumEducationLevelNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumEducationLevelNullableFilterObjectSchema } from './NestedEnumEducationLevelNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumEducationLevelNullableWithAggregatesFilter> =
  z
    .object({
      equals: z
        .lazy(() => EducationLevelSchema)
        .optional()
        .nullable(),
      in: z
        .union([
          z.lazy(() => EducationLevelSchema).array(),
          z.lazy(() => EducationLevelSchema),
        ])
        .optional()
        .nullable(),
      notIn: z
        .union([
          z.lazy(() => EducationLevelSchema).array(),
          z.lazy(() => EducationLevelSchema),
        ])
        .optional()
        .nullable(),
      not: z
        .union([
          z.lazy(() => EducationLevelSchema),
          z.lazy(
            () =>
              NestedEnumEducationLevelNullableWithAggregatesFilterObjectSchema,
          ),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
      _min: z
        .lazy(() => NestedEnumEducationLevelNullableFilterObjectSchema)
        .optional(),
      _max: z
        .lazy(() => NestedEnumEducationLevelNullableFilterObjectSchema)
        .optional(),
      isSet: z.boolean().optional(),
    })
    .strict();

export const EnumEducationLevelNullableWithAggregatesFilterObjectSchema =
  Schema;
