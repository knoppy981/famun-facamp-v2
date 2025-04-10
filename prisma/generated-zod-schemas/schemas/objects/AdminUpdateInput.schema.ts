import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { ConfirmationCodeNullableUpdateEnvelopeInputObjectSchema } from './ConfirmationCodeNullableUpdateEnvelopeInput.schema';
import { ConfirmationCodeCreateInputObjectSchema } from './ConfirmationCodeCreateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AdminUpdateInput> = z
  .object({
    email: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    hash: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    confirmationCode: z
      .union([
        z.lazy(() => ConfirmationCodeNullableUpdateEnvelopeInputObjectSchema),
        z.lazy(() => ConfirmationCodeCreateInputObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const AdminUpdateInputObjectSchema = Schema;
