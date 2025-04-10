import { z } from 'zod';
import { CouncilObjectEqualityInputObjectSchema } from './CouncilObjectEqualityInput.schema';
import { CouncilWhereInputObjectSchema } from './CouncilWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CouncilCompositeListFilter> = z
  .object({
    equals: z
      .union([
        z.lazy(() => CouncilObjectEqualityInputObjectSchema),
        z.lazy(() => CouncilObjectEqualityInputObjectSchema).array(),
      ])
      .optional(),
    every: z.lazy(() => CouncilWhereInputObjectSchema).optional(),
    some: z.lazy(() => CouncilWhereInputObjectSchema).optional(),
    none: z.lazy(() => CouncilWhereInputObjectSchema).optional(),
    isEmpty: z.boolean().optional(),
    isSet: z.boolean().optional(),
  })
  .strict();

export const CouncilCompositeListFilterObjectSchema = Schema;
