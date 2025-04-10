import { z } from 'zod';
import { LanguagesSchema } from '../enums/Languages.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdatelanguagesSimulatesInput> = z
  .object({
    set: z
      .lazy(() => LanguagesSchema)
      .array()
      .optional(),
    push: z
      .union([
        z.lazy(() => LanguagesSchema),
        z.lazy(() => LanguagesSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const UserUpdatelanguagesSimulatesInputObjectSchema = Schema;
