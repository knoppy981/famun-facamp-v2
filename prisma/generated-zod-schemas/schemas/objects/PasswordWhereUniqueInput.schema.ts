import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PasswordWhereUniqueInput> = z
  .object({
    id: z.string().optional(),
    userId: z.string().optional(),
  })
  .strict();

export const PasswordWhereUniqueInputObjectSchema = Schema;
