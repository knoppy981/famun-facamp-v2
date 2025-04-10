import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConfirmationCodeCreateInput> = z
  .object({
    code: z.string(),
    createdAt: z.coerce.date().optional(),
    expiresAt: z.coerce.date(),
  })
  .strict();

export const ConfirmationCodeCreateInputObjectSchema = Schema;
