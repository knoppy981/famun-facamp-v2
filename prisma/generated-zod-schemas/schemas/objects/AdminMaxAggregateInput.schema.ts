import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AdminMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    email: z.literal(true).optional(),
    hash: z.literal(true).optional(),
  })
  .strict();

export const AdminMaxAggregateInputObjectSchema = Schema;
