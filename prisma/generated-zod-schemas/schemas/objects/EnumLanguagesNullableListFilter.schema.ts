import { z } from 'zod';
import { LanguagesSchema } from '../enums/Languages.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumLanguagesNullableListFilter> = z
  .object({
    equals: z
      .lazy(() => LanguagesSchema)
      .array()
      .optional()
      .nullable(),
    has: z
      .lazy(() => LanguagesSchema)
      .optional()
      .nullable(),
    hasEvery: z
      .lazy(() => LanguagesSchema)
      .array()
      .optional(),
    hasSome: z
      .lazy(() => LanguagesSchema)
      .array()
      .optional(),
    isEmpty: z.boolean().optional(),
  })
  .strict();

export const EnumLanguagesNullableListFilterObjectSchema = Schema;
