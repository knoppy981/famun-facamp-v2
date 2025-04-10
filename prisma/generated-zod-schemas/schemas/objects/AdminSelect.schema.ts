import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AdminSelect> = z
  .object({
    id: z.boolean().optional(),
    email: z.boolean().optional(),
    hash: z.boolean().optional(),
    confirmationCode: z.boolean().optional(),
  })
  .strict();

export const AdminSelectObjectSchema = Schema;
