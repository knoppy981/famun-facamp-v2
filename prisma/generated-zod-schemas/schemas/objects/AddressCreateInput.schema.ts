import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AddressCreateInput> = z
  .object({
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    state: z.string(),
    country: z.string(),
  })
  .strict();

export const AddressCreateInputObjectSchema = Schema;
