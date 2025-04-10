import { z } from 'zod';
import { DelegationSelectObjectSchema } from './DelegationSelect.schema';
import { DelegationIncludeObjectSchema } from './DelegationInclude.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationArgs> = z
  .object({
    select: z.lazy(() => DelegationSelectObjectSchema).optional(),
    include: z.lazy(() => DelegationIncludeObjectSchema).optional(),
  })
  .strict();

export const DelegationArgsObjectSchema = Schema;
