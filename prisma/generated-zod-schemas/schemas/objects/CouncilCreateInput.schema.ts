import { z } from 'zod';
import { LanguagesSchema } from '../enums/Languages.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CouncilCreateInput> = z
  .object({
    council: z.string(),
    language: z.lazy(() => LanguagesSchema),
    id: z.number(),
    description: z.string(),
  })
  .strict();

export const CouncilCreateInputObjectSchema = Schema;
