import { z } from 'zod';
import { LanguagesSchema } from '../enums/Languages.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumLanguagesFilter> = z
  .object({
    equals: z.lazy(() => LanguagesSchema).optional(),
    in: z
      .union([
        z.lazy(() => LanguagesSchema).array(),
        z.lazy(() => LanguagesSchema),
      ])
      .optional(),
    notIn: z
      .union([
        z.lazy(() => LanguagesSchema).array(),
        z.lazy(() => LanguagesSchema),
      ])
      .optional(),
    not: z
      .union([
        z.lazy(() => LanguagesSchema),
        z.lazy(() => NestedEnumLanguagesFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const NestedEnumLanguagesFilterObjectSchema = Schema;
