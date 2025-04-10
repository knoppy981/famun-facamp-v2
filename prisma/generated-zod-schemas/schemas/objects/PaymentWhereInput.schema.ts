import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { BoolFilterObjectSchema } from './BoolFilter.schema';
import { BoolNullableFilterObjectSchema } from './BoolNullableFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DelegationRelationFilterObjectSchema } from './DelegationRelationFilter.schema';
import { DelegationWhereInputObjectSchema } from './DelegationWhereInput.schema';
import { UserRelationFilterObjectSchema } from './UserRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => PaymentWhereInputObjectSchema),
        z.lazy(() => PaymentWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PaymentWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PaymentWhereInputObjectSchema),
        z.lazy(() => PaymentWhereInputObjectSchema).array(),
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
    delegation: z
      .union([
        z.lazy(() => DelegationRelationFilterObjectSchema),
        z.lazy(() => DelegationWhereInputObjectSchema),
      ])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const PaymentWhereInputObjectSchema = Schema;
