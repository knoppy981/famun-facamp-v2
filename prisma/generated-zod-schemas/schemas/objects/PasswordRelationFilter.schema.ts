import { z } from 'zod';
import { PasswordWhereInputObjectSchema } from './PasswordWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PasswordRelationFilter> = z
  .object({
    is: z
      .lazy(() => PasswordWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => PasswordWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const PasswordRelationFilterObjectSchema = Schema;
