import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConfirmationCodeWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ConfirmationCodeWhereInputObjectSchema),
        z.lazy(() => ConfirmationCodeWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ConfirmationCodeWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ConfirmationCodeWhereInputObjectSchema),
        z.lazy(() => ConfirmationCodeWhereInputObjectSchema).array(),
      ])
      .optional(),
    code: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    expiresAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
  })
  .strict();

export const ConfirmationCodeWhereInputObjectSchema = Schema;
