import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PasswordMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    hash: z.literal(true).optional(),
    userId: z.literal(true).optional(),
  })
  .strict();

export const PasswordMaxAggregateInputObjectSchema = Schema;
