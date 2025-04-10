import { z } from 'zod';
import { EducationLevelSchema } from '../enums/EducationLevel.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NullableEnumEducationLevelFieldUpdateOperationsInput> =
  z
    .object({
      set: z
        .lazy(() => EducationLevelSchema)
        .optional()
        .nullable(),
      unset: z.boolean().optional(),
    })
    .strict();

export const NullableEnumEducationLevelFieldUpdateOperationsInputObjectSchema =
  Schema;
