import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PasswordCreateWithoutUserInput> = z
  .object({
    id: z.string().optional(),
    hash: z.string(),
  })
  .strict();

export const PasswordCreateWithoutUserInputObjectSchema = Schema;
