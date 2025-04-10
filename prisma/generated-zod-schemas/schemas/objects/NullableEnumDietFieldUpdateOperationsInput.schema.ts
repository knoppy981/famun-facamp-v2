import { z } from 'zod';
import { DietSchema } from '../enums/Diet.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NullableEnumDietFieldUpdateOperationsInput> = z
  .object({
    set: z
      .lazy(() => DietSchema)
      .optional()
      .nullable(),
    unset: z.boolean().optional(),
  })
  .strict();

export const NullableEnumDietFieldUpdateOperationsInputObjectSchema = Schema;
