import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ParticipationMethodSchema } from '../enums/ParticipationMethod.schema';
import { EnumParticipationMethodFieldUpdateOperationsInputObjectSchema } from './EnumParticipationMethodFieldUpdateOperationsInput.schema';
import { AddressUpdateEnvelopeInputObjectSchema } from './AddressUpdateEnvelopeInput.schema';
import { AddressCreateInputObjectSchema } from './AddressCreateInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationUpdateManyMutationInput> = z
  .object({
    code: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    inviteLink: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    school: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    phoneNumber: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    paymentExpirationDate: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    participationMethod: z
      .union([
        z.lazy(() => ParticipationMethodSchema),
        z.lazy(
          () => EnumParticipationMethodFieldUpdateOperationsInputObjectSchema,
        ),
      ])
      .optional(),
    address: z
      .union([
        z.lazy(() => AddressUpdateEnvelopeInputObjectSchema),
        z.lazy(() => AddressCreateInputObjectSchema),
      ])
      .optional(),
    maxDelegates: z
      .union([
        z.number(),
        z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    maxAdvisors: z
      .union([
        z.number(),
        z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const DelegationUpdateManyMutationInputObjectSchema = Schema;
