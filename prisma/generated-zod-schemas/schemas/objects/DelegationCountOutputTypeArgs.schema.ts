import { z } from 'zod';
import { DelegationCountOutputTypeSelectObjectSchema } from './DelegationCountOutputTypeSelect.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationCountOutputTypeArgs> = z
  .object({
    select: z
      .lazy(() => DelegationCountOutputTypeSelectObjectSchema)
      .optional(),
  })
  .strict();

export const DelegationCountOutputTypeArgsObjectSchema = Schema;
