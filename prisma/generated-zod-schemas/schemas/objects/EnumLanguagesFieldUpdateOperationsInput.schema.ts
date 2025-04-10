import { z } from 'zod';
import { LanguagesSchema } from '../enums/Languages.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumLanguagesFieldUpdateOperationsInput> = z
  .object({
    set: z.lazy(() => LanguagesSchema).optional(),
  })
  .strict();

export const EnumLanguagesFieldUpdateOperationsInputObjectSchema = Schema;
