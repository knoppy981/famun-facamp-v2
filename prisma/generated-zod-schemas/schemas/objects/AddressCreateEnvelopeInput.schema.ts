import { z } from 'zod';
import { AddressCreateInputObjectSchema } from './AddressCreateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AddressCreateEnvelopeInput> = z
  .object({
    set: z.lazy(() => AddressCreateInputObjectSchema).optional(),
  })
  .strict();

export const AddressCreateEnvelopeInputObjectSchema = Schema;
