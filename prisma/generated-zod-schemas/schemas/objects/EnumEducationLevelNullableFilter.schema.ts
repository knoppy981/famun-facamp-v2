import { z } from 'zod';
import { EducationLevelSchema } from '../enums/EducationLevel.schema';
import { NestedEnumEducationLevelNullableFilterObjectSchema } from './NestedEnumEducationLevelNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumEducationLevelNullableFilter> = z
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
        z.lazy(() => NestedEnumEducationLevelNullableFilterObjectSchema),
      ])
      .optional()
      .nullable(),
    isSet: z.boolean().optional(),
  })
  .strict();

export const EnumEducationLevelNullableFilterObjectSchema = Schema;
