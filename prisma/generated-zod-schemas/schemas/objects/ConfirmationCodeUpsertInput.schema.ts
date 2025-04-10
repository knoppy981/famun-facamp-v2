import { z } from 'zod';
import { ConfirmationCodeCreateInputObjectSchema } from './ConfirmationCodeCreateInput.schema';
import { ConfirmationCodeUpdateInputObjectSchema } from './ConfirmationCodeUpdateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConfirmationCodeUpsertInput> = z
  .object({
    set: z.lazy(() => ConfirmationCodeCreateInputObjectSchema).nullable(),
    update: z.lazy(() => ConfirmationCodeUpdateInputObjectSchema),
  })
  .strict();

export const ConfirmationCodeUpsertInputObjectSchema = Schema;
