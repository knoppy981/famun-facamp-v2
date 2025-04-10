import { z } from 'zod';
import { PasswordSelectObjectSchema } from './PasswordSelect.schema';
import { PasswordIncludeObjectSchema } from './PasswordInclude.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PasswordArgs> = z
  .object({
    select: z.lazy(() => PasswordSelectObjectSchema).optional(),
    include: z.lazy(() => PasswordIncludeObjectSchema).optional(),
  })
  .strict();

export const PasswordArgsObjectSchema = Schema;
