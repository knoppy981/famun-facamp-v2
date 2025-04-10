import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AdminMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    email: z.literal(true).optional(),
    hash: z.literal(true).optional(),
  })
  .strict();

export const AdminMinAggregateInputObjectSchema = Schema;
