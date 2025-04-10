import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PasswordUncheckedCreateInput> = z
  .object({
    id: z.string().optional(),
    hash: z.string(),
    userId: z.string(),
  })
  .strict();

export const PasswordUncheckedCreateInputObjectSchema = Schema;
