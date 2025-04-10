import { z } from 'zod';
import { ConfirmationCodeCreateInputObjectSchema } from './ConfirmationCodeCreateInput.schema';
import { ConfirmationCodeUpsertInputObjectSchema } from './ConfirmationCodeUpsertInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConfirmationCodeNullableUpdateEnvelopeInput> = z
  .object({
    set: z
      .lazy(() => ConfirmationCodeCreateInputObjectSchema)
      .optional()
      .nullable(),
    upsert: z.lazy(() => ConfirmationCodeUpsertInputObjectSchema).optional(),
    unset: z.boolean().optional(),
  })
  .strict();

export const ConfirmationCodeNullableUpdateEnvelopeInputObjectSchema = Schema;
