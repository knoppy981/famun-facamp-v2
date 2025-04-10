import { z } from 'zod';
import { SexSchema } from '../enums/Sex.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumSexFieldUpdateOperationsInput> = z
  .object({
    set: z.lazy(() => SexSchema).optional(),
  })
  .strict();

export const EnumSexFieldUpdateOperationsInputObjectSchema = Schema;
