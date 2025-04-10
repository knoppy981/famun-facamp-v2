import { z } from 'zod';
import { AddressCreateInputObjectSchema } from './AddressCreateInput.schema';
import { AddressUpdateInputObjectSchema } from './AddressUpdateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AddressUpdateEnvelopeInput> = z
  .object({
    set: z.lazy(() => AddressCreateInputObjectSchema).optional(),
    update: z.lazy(() => AddressUpdateInputObjectSchema).optional(),
  })
  .strict();

export const AddressUpdateEnvelopeInputObjectSchema = Schema;
