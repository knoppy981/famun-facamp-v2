import { z } from 'zod';
import { AddressObjectEqualityInputObjectSchema } from './AddressObjectEqualityInput.schema';
import { AddressWhereInputObjectSchema } from './AddressWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AddressCompositeFilter> = z
  .object({
    equals: z.lazy(() => AddressObjectEqualityInputObjectSchema).optional(),
    is: z.lazy(() => AddressWhereInputObjectSchema).optional(),
    isNot: z.lazy(() => AddressWhereInputObjectSchema).optional(),
  })
  .strict();

export const AddressCompositeFilterObjectSchema = Schema;
