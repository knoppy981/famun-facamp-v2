import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationSumAggregateInputType> = z
  .object({
    maxDelegates: z.literal(true).optional(),
    maxAdvisors: z.literal(true).optional(),
  })
  .strict();

export const DelegationSumAggregateInputObjectSchema = Schema;
