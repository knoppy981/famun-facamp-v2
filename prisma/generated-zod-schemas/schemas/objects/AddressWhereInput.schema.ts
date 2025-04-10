import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AddressWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => AddressWhereInputObjectSchema),
        z.lazy(() => AddressWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AddressWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => AddressWhereInputObjectSchema),
        z.lazy(() => AddressWhereInputObjectSchema).array(),
      ])
      .optional(),
    address: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    city: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    postalCode: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    state: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    country: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
  })
  .strict();

export const AddressWhereInputObjectSchema = Schema;
