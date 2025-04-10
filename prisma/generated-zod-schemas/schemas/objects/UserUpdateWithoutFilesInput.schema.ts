import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { SexSchema } from '../enums/Sex.schema';
import { EnumSexFieldUpdateOperationsInputObjectSchema } from './EnumSexFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { DietSchema } from '../enums/Diet.schema';
import { NullableEnumDietFieldUpdateOperationsInputObjectSchema } from './NullableEnumDietFieldUpdateOperationsInput.schema';
import { ParticipantTypeSchema } from '../enums/ParticipantType.schema';
import { EnumParticipantTypeFieldUpdateOperationsInputObjectSchema } from './EnumParticipantTypeFieldUpdateOperationsInput.schema';
import { EducationLevelSchema } from '../enums/EducationLevel.schema';
import { NullableEnumEducationLevelFieldUpdateOperationsInputObjectSchema } from './NullableEnumEducationLevelFieldUpdateOperationsInput.schema';
import { UserUpdatelanguagesSimulatesInputObjectSchema } from './UserUpdatelanguagesSimulatesInput.schema';
import { LanguagesSchema } from '../enums/Languages.schema';
import { CouncilListUpdateEnvelopeInputObjectSchema } from './CouncilListUpdateEnvelopeInput.schema';
import { CouncilCreateInputObjectSchema } from './CouncilCreateInput.schema';
import { AdvisorRoleSchema } from '../enums/AdvisorRole.schema';
import { NullableEnumAdvisorRoleFieldUpdateOperationsInputObjectSchema } from './NullableEnumAdvisorRoleFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { ConfirmationCodeNullableUpdateEnvelopeInputObjectSchema } from './ConfirmationCodeNullableUpdateEnvelopeInput.schema';
import { ConfirmationCodeCreateInputObjectSchema } from './ConfirmationCodeCreateInput.schema';
import { PasswordUpdateOneWithoutUserNestedInputObjectSchema } from './PasswordUpdateOneWithoutUserNestedInput.schema';
import { PaymentUpdateManyWithoutUserNestedInputObjectSchema } from './PaymentUpdateManyWithoutUserNestedInput.schema';
import { DelegationUpdateOneRequiredWithoutUsersNestedInputObjectSchema } from './DelegationUpdateOneRequiredWithoutUsersNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateWithoutFilesInput> = z
  .object({
    email: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    stripeCustomerId: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    name: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    sex: z
      .union([
        z.lazy(() => SexSchema),
        z.lazy(() => EnumSexFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    socialName: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    cpf: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    rg: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    passport: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    phoneNumber: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    birthDate: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    nationality: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    diet: z
      .union([
        z.lazy(() => DietSchema),
        z.lazy(() => NullableEnumDietFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    foodRestriction: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    type: z
      .union([
        z.lazy(() => ParticipantTypeSchema),
        z.lazy(() => EnumParticipantTypeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    emergencyContactName: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    emergencyContactPhoneNumber: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    educationLevel: z
      .union([
        z.lazy(() => EducationLevelSchema),
        z.lazy(
          () =>
            NullableEnumEducationLevelFieldUpdateOperationsInputObjectSchema,
        ),
      ])
      .optional()
      .nullable(),
    currentYear: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    languagesSimulates: z
      .union([
        z.lazy(() => UserUpdatelanguagesSimulatesInputObjectSchema),
        z.lazy(() => LanguagesSchema).array(),
      ])
      .optional(),
    councilPreference: z
      .union([
        z.lazy(() => CouncilListUpdateEnvelopeInputObjectSchema),
        z.lazy(() => CouncilCreateInputObjectSchema),
        z.lazy(() => CouncilCreateInputObjectSchema).array(),
      ])
      .optional(),
    advisorRole: z
      .union([
        z.lazy(() => AdvisorRoleSchema),
        z.lazy(
          () => NullableEnumAdvisorRoleFieldUpdateOperationsInputObjectSchema,
        ),
      ])
      .optional()
      .nullable(),
    facebook: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    instagram: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    linkedin: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    leader: z
      .union([
        z.boolean(),
        z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    confirmationCode: z
      .union([
        z.lazy(() => ConfirmationCodeNullableUpdateEnvelopeInputObjectSchema),
        z.lazy(() => ConfirmationCodeCreateInputObjectSchema),
      ])
      .optional()
      .nullable(),
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
    password: z
      .lazy(() => PasswordUpdateOneWithoutUserNestedInputObjectSchema)
      .optional(),
    payments: z
      .lazy(() => PaymentUpdateManyWithoutUserNestedInputObjectSchema)
      .optional(),
    delegation: z
      .lazy(
        () => DelegationUpdateOneRequiredWithoutUsersNestedInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const UserUpdateWithoutFilesInputObjectSchema = Schema;
