import { z } from 'zod';
import { LanguagesSchema } from '../enums/Languages.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreatelanguagesSimulatesInput> = z
  .object({
    set: z.lazy(() => LanguagesSchema).array(),
  })
  .strict();

export const UserCreatelanguagesSimulatesInputObjectSchema = Schema;
