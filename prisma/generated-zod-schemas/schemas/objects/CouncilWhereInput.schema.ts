import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { EnumLanguagesFilterObjectSchema } from './EnumLanguagesFilter.schema';
import { LanguagesSchema } from '../enums/Languages.schema';
import { IntFilterObjectSchema } from './IntFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CouncilWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CouncilWhereInputObjectSchema),
        z.lazy(() => CouncilWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CouncilWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CouncilWhereInputObjectSchema),
        z.lazy(() => CouncilWhereInputObjectSchema).array(),
      ])
      .optional(),
    council: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    language: z
      .union([
        z.lazy(() => EnumLanguagesFilterObjectSchema),
        z.lazy(() => LanguagesSchema),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    description: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
  })
  .strict();

export const CouncilWhereInputObjectSchema = Schema;
