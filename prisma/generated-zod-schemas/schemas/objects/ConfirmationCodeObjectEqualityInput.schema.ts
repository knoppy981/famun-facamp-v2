import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConfirmationCodeObjectEqualityInput> = z
  .object({
    code: z.string(),
    createdAt: z.coerce.date(),
    expiresAt: z.coerce.date(),
  })
  .strict();

export const ConfirmationCodeObjectEqualityInputObjectSchema = Schema;
