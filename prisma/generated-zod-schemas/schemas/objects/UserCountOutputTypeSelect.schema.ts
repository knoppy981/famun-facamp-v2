import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z
  .object({
    payments: z.boolean().optional(),
    files: z.boolean().optional(),
  })
  .strict();

export const UserCountOutputTypeSelectObjectSchema = Schema;
