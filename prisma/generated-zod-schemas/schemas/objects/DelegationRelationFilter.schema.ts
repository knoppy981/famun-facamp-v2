import { z } from 'zod';
import { DelegationWhereInputObjectSchema } from './DelegationWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationRelationFilter> = z
  .object({
    is: z
      .lazy(() => DelegationWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => DelegationWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const DelegationRelationFilterObjectSchema = Schema;
