import { z } from 'zod';
import { ConfirmationCodeNullableCreateEnvelopeInputObjectSchema } from './ConfirmationCodeNullableCreateEnvelopeInput.schema';
import { ConfirmationCodeCreateInputObjectSchema } from './ConfirmationCodeCreateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AdminUncheckedCreateInput> = z
  .object({
    id: z.string().optional(),
    email: z.string(),
    hash: z.string(),
    confirmationCode: z
      .union([
        z.lazy(() => ConfirmationCodeNullableCreateEnvelopeInputObjectSchema),
        z.lazy(() => ConfirmationCodeCreateInputObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const AdminUncheckedCreateInputObjectSchema = Schema;
