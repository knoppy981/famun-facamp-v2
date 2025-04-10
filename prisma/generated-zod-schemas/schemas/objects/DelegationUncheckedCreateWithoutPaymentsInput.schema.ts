import { z } from 'zod';
import { ParticipationMethodSchema } from '../enums/ParticipationMethod.schema';
import { AddressCreateEnvelopeInputObjectSchema } from './AddressCreateEnvelopeInput.schema';
import { AddressCreateInputObjectSchema } from './AddressCreateInput.schema';
import { UserUncheckedCreateNestedManyWithoutDelegationInputObjectSchema } from './UserUncheckedCreateNestedManyWithoutDelegationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationUncheckedCreateWithoutPaymentsInput> =
  z
    .object({
      id: z.string().optional(),
      code: z.string(),
      inviteLink: z.string(),
      school: z.string(),
      phoneNumber: z.string(),
      paymentExpirationDate: z.coerce.date(),
      participationMethod: z.lazy(() => ParticipationMethodSchema),
      address: z.union([
        z.lazy(() => AddressCreateEnvelopeInputObjectSchema),
        z.lazy(() => AddressCreateInputObjectSchema),
      ]),
      maxDelegates: z.number(),
      maxAdvisors: z.number(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      users: z
        .lazy(
          () => UserUncheckedCreateNestedManyWithoutDelegationInputObjectSchema,
        )
        .optional(),
    })
    .strict();

export const DelegationUncheckedCreateWithoutPaymentsInputObjectSchema = Schema;
