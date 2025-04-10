import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EnumParticipationMethodFilterObjectSchema } from './EnumParticipationMethodFilter.schema';
import { ParticipationMethodSchema } from '../enums/ParticipationMethod.schema';
import { AddressCompositeFilterObjectSchema } from './AddressCompositeFilter.schema';
import { AddressObjectEqualityInputObjectSchema } from './AddressObjectEqualityInput.schema';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { UserListRelationFilterObjectSchema } from './UserListRelationFilter.schema';
import { PaymentListRelationFilterObjectSchema } from './PaymentListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => DelegationWhereInputObjectSchema),
        z.lazy(() => DelegationWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => DelegationWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => DelegationWhereInputObjectSchema),
        z.lazy(() => DelegationWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    code: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    inviteLink: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    school: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    phoneNumber: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    paymentExpirationDate: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    participationMethod: z
      .union([
        z.lazy(() => EnumParticipationMethodFilterObjectSchema),
        z.lazy(() => ParticipationMethodSchema),
      ])
      .optional(),
    address: z
      .union([
        z.lazy(() => AddressCompositeFilterObjectSchema),
        z.lazy(() => AddressObjectEqualityInputObjectSchema),
      ])
      .optional(),
    maxDelegates: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    maxAdvisors: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    users: z.lazy(() => UserListRelationFilterObjectSchema).optional(),
    payments: z.lazy(() => PaymentListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const DelegationWhereInputObjectSchema = Schema;
