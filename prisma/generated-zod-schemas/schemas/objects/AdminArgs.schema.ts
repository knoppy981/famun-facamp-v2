import { z } from 'zod';
import { AdminSelectObjectSchema } from './AdminSelect.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AdminArgs> = z
  .object({
    select: z.lazy(() => AdminSelectObjectSchema).optional(),
  })
  .strict();

export const AdminArgsObjectSchema = Schema;
