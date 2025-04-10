import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationCountOutputTypeSelect> = z
  .object({
    users: z.boolean().optional(),
    payments: z.boolean().optional(),
  })
  .strict();

export const DelegationCountOutputTypeSelectObjectSchema = Schema;
