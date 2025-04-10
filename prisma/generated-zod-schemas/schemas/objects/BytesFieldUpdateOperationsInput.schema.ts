import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.BytesFieldUpdateOperationsInput> = z
  .object({
    set: z.instanceof(Buffer).optional(),
  })
  .strict();

export const BytesFieldUpdateOperationsInputObjectSchema = Schema;
