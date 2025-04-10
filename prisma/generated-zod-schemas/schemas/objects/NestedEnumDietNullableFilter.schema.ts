import { z } from 'zod';
import { DietSchema } from '../enums/Diet.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumDietNullableFilter> = z
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
        z.lazy(() => NestedEnumDietNullableFilterObjectSchema),
      ])
      .optional()
      .nullable(),
    isSet: z.boolean().optional(),
  })
  .strict();

export const NestedEnumDietNullableFilterObjectSchema = Schema;
