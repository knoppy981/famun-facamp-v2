import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationWhereUniqueInput> = z
  .object({
    id: z.string().optional(),
    code: z.string().optional(),
    school: z.string().optional(),
  })
  .strict();

export const DelegationWhereUniqueInputObjectSchema = Schema;
