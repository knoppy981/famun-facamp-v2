import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationAvgAggregateInputType> = z
  .object({
    maxDelegates: z.literal(true).optional(),
    maxAdvisors: z.literal(true).optional(),
  })
  .strict();

export const DelegationAvgAggregateInputObjectSchema = Schema;
