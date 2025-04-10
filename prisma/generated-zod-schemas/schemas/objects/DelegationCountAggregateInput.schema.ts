import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    code: z.literal(true).optional(),
    inviteLink: z.literal(true).optional(),
    school: z.literal(true).optional(),
    phoneNumber: z.literal(true).optional(),
    paymentExpirationDate: z.literal(true).optional(),
    participationMethod: z.literal(true).optional(),
    maxDelegates: z.literal(true).optional(),
    maxAdvisors: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const DelegationCountAggregateInputObjectSchema = Schema;
