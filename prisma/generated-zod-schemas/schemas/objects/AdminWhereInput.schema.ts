import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { ConfirmationCodeNullableCompositeFilterObjectSchema } from './ConfirmationCodeNullableCompositeFilter.schema';
import { ConfirmationCodeObjectEqualityInputObjectSchema } from './ConfirmationCodeObjectEqualityInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AdminWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => AdminWhereInputObjectSchema),
        z.lazy(() => AdminWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AdminWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => AdminWhereInputObjectSchema),
        z.lazy(() => AdminWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    email: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    hash: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    confirmationCode: z
      .union([
        z.lazy(() => ConfirmationCodeNullableCompositeFilterObjectSchema),
        z.lazy(() => ConfirmationCodeObjectEqualityInputObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const AdminWhereInputObjectSchema = Schema;
