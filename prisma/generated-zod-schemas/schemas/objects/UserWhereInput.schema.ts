import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { EnumSexFilterObjectSchema } from './EnumSexFilter.schema';
import { SexSchema } from '../enums/Sex.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EnumDietNullableFilterObjectSchema } from './EnumDietNullableFilter.schema';
import { DietSchema } from '../enums/Diet.schema';
import { EnumParticipantTypeFilterObjectSchema } from './EnumParticipantTypeFilter.schema';
import { ParticipantTypeSchema } from '../enums/ParticipantType.schema';
import { EnumEducationLevelNullableFilterObjectSchema } from './EnumEducationLevelNullableFilter.schema';
import { EducationLevelSchema } from '../enums/EducationLevel.schema';
import { EnumLanguagesNullableListFilterObjectSchema } from './EnumLanguagesNullableListFilter.schema';
import { CouncilCompositeListFilterObjectSchema } from './CouncilCompositeListFilter.schema';
import { CouncilObjectEqualityInputObjectSchema } from './CouncilObjectEqualityInput.schema';
import { EnumAdvisorRoleNullableFilterObjectSchema } from './EnumAdvisorRoleNullableFilter.schema';
import { AdvisorRoleSchema } from '../enums/AdvisorRole.schema';
import { BoolFilterObjectSchema } from './BoolFilter.schema';
import { ConfirmationCodeNullableCompositeFilterObjectSchema } from './ConfirmationCodeNullableCompositeFilter.schema';
import { ConfirmationCodeObjectEqualityInputObjectSchema } from './ConfirmationCodeObjectEqualityInput.schema';
import { PasswordRelationFilterObjectSchema } from './PasswordRelationFilter.schema';
import { PasswordWhereInputObjectSchema } from './PasswordWhereInput.schema';
import { PaymentListRelationFilterObjectSchema } from './PaymentListRelationFilter.schema';
import { FileListRelationFilterObjectSchema } from './FileListRelationFilter.schema';
import { DelegationRelationFilterObjectSchema } from './DelegationRelationFilter.schema';
import { DelegationWhereInputObjectSchema } from './DelegationWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserWhereInputObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInputObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    email: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    stripeCustomerId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    sex: z
      .union([z.lazy(() => EnumSexFilterObjectSchema), z.lazy(() => SexSchema)])
      .optional(),
    socialName: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    cpf: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    rg: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    passport: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    phoneNumber: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    birthDate: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    nationality: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    diet: z
      .union([
        z.lazy(() => EnumDietNullableFilterObjectSchema),
        z.lazy(() => DietSchema),
      ])
      .optional()
      .nullable(),
    foodRestriction: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    type: z
      .union([
        z.lazy(() => EnumParticipantTypeFilterObjectSchema),
        z.lazy(() => ParticipantTypeSchema),
      ])
      .optional(),
    emergencyContactName: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    emergencyContactPhoneNumber: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    educationLevel: z
      .union([
        z.lazy(() => EnumEducationLevelNullableFilterObjectSchema),
        z.lazy(() => EducationLevelSchema),
      ])
      .optional()
      .nullable(),
    currentYear: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    languagesSimulates: z
      .lazy(() => EnumLanguagesNullableListFilterObjectSchema)
      .optional(),
    councilPreference: z
      .union([
        z.lazy(() => CouncilCompositeListFilterObjectSchema),
        z.lazy(() => CouncilObjectEqualityInputObjectSchema).array(),
        z.lazy(() => CouncilObjectEqualityInputObjectSchema),
      ])
      .optional(),
    advisorRole: z
      .union([
        z.lazy(() => EnumAdvisorRoleNullableFilterObjectSchema),
        z.lazy(() => AdvisorRoleSchema),
      ])
      .optional()
      .nullable(),
    facebook: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    instagram: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    linkedin: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    leader: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    delegationId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    confirmationCode: z
      .union([
        z.lazy(() => ConfirmationCodeNullableCompositeFilterObjectSchema),
        z.lazy(() => ConfirmationCodeObjectEqualityInputObjectSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    password: z
      .union([
        z.lazy(() => PasswordRelationFilterObjectSchema),
        z.lazy(() => PasswordWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
    payments: z.lazy(() => PaymentListRelationFilterObjectSchema).optional(),
    files: z.lazy(() => FileListRelationFilterObjectSchema).optional(),
    delegation: z
      .union([
        z.lazy(() => DelegationRelationFilterObjectSchema),
        z.lazy(() => DelegationWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const UserWhereInputObjectSchema = Schema;
