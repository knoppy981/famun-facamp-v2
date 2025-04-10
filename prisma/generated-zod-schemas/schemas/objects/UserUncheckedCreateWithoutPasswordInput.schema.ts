import { z } from 'zod';
import { SexSchema } from '../enums/Sex.schema';
import { DietSchema } from '../enums/Diet.schema';
import { ParticipantTypeSchema } from '../enums/ParticipantType.schema';
import { EducationLevelSchema } from '../enums/EducationLevel.schema';
import { UserCreatelanguagesSimulatesInputObjectSchema } from './UserCreatelanguagesSimulatesInput.schema';
import { LanguagesSchema } from '../enums/Languages.schema';
import { CouncilListCreateEnvelopeInputObjectSchema } from './CouncilListCreateEnvelopeInput.schema';
import { CouncilCreateInputObjectSchema } from './CouncilCreateInput.schema';
import { AdvisorRoleSchema } from '../enums/AdvisorRole.schema';
import { ConfirmationCodeNullableCreateEnvelopeInputObjectSchema } from './ConfirmationCodeNullableCreateEnvelopeInput.schema';
import { ConfirmationCodeCreateInputObjectSchema } from './ConfirmationCodeCreateInput.schema';
import { PaymentUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './PaymentUncheckedCreateNestedManyWithoutUserInput.schema';
import { FileUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './FileUncheckedCreateNestedManyWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUncheckedCreateWithoutPasswordInput> = z
  .object({
    id: z.string().optional(),
    email: z.string(),
    stripeCustomerId: z.string(),
    name: z.string(),
    sex: z.lazy(() => SexSchema),
    socialName: z.string().optional().nullable(),
    cpf: z.string().optional().nullable(),
    rg: z.string().optional().nullable(),
    passport: z.string().optional().nullable(),
    phoneNumber: z.string(),
    birthDate: z.coerce.date(),
    nationality: z.string(),
    diet: z
      .lazy(() => DietSchema)
      .optional()
      .nullable(),
    foodRestriction: z.string().optional().nullable(),
    type: z.lazy(() => ParticipantTypeSchema),
    emergencyContactName: z.string().optional().nullable(),
    emergencyContactPhoneNumber: z.string().optional().nullable(),
    educationLevel: z
      .lazy(() => EducationLevelSchema)
      .optional()
      .nullable(),
    currentYear: z.string().optional().nullable(),
    languagesSimulates: z
      .union([
        z.lazy(() => UserCreatelanguagesSimulatesInputObjectSchema),
        z.lazy(() => LanguagesSchema).array(),
      ])
      .optional(),
    councilPreference: z
      .union([
        z.lazy(() => CouncilListCreateEnvelopeInputObjectSchema),
        z.lazy(() => CouncilCreateInputObjectSchema),
        z.lazy(() => CouncilCreateInputObjectSchema).array(),
      ])
      .optional(),
    advisorRole: z
      .lazy(() => AdvisorRoleSchema)
      .optional()
      .nullable(),
    facebook: z.string().optional().nullable(),
    instagram: z.string().optional().nullable(),
    linkedin: z.string().optional().nullable(),
    leader: z.boolean().optional(),
    delegationId: z.string(),
    confirmationCode: z
      .union([
        z.lazy(() => ConfirmationCodeNullableCreateEnvelopeInputObjectSchema),
        z.lazy(() => ConfirmationCodeCreateInputObjectSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    payments: z
      .lazy(() => PaymentUncheckedCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
    files: z
      .lazy(() => FileUncheckedCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserUncheckedCreateWithoutPasswordInputObjectSchema = Schema;
