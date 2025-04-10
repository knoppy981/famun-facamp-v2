import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { BoolFilterObjectSchema } from './BoolFilter.schema';
import { BoolNullableFilterObjectSchema } from './BoolNullableFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => PaymentScalarWhereInputObjectSchema),
        z.lazy(() => PaymentScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PaymentScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PaymentScalarWhereInputObjectSchema),
        z.lazy(() => PaymentScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    amount: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    currency: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    delegatesPayments: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    advisorsPayments: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    paymentMethod: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    receiptUrl: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    accepted: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    isFake: z
      .union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()])
      .optional()
      .nullable(),
    stripeCheckoutSessionId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    stripePaymentIntentId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    coupon: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    discount: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    delegationId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    userId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
  })
  .strict();

export const PaymentScalarWhereInputObjectSchema = Schema;
