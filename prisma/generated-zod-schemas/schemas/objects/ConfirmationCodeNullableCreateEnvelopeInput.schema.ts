import { z } from 'zod';
import { ConfirmationCodeCreateInputObjectSchema } from './ConfirmationCodeCreateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConfirmationCodeNullableCreateEnvelopeInput> = z
  .object({
    set: z
      .lazy(() => ConfirmationCodeCreateInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const ConfirmationCodeNullableCreateEnvelopeInputObjectSchema = Schema;
