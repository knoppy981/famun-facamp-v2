import { z } from 'zod';
import { ConfirmationCodeObjectEqualityInputObjectSchema } from './ConfirmationCodeObjectEqualityInput.schema';
import { ConfirmationCodeWhereInputObjectSchema } from './ConfirmationCodeWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ConfirmationCodeNullableCompositeFilter> = z
  .object({
    equals: z
      .lazy(() => ConfirmationCodeObjectEqualityInputObjectSchema)
      .optional()
      .nullable(),
    is: z
      .lazy(() => ConfirmationCodeWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => ConfirmationCodeWhereInputObjectSchema)
      .optional()
      .nullable(),
    isSet: z.boolean().optional(),
  })
  .strict();

export const ConfirmationCodeNullableCompositeFilterObjectSchema = Schema;
