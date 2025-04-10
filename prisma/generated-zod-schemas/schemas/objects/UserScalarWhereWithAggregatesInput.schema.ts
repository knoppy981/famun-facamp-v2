import { z } from 'zod';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumSexWithAggregatesFilterObjectSchema } from './EnumSexWithAggregatesFilter.schema';
import { SexSchema } from '../enums/Sex.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { EnumDietNullableWithAggregatesFilterObjectSchema } from './EnumDietNullableWithAggregatesFilter.schema';
import { DietSchema } from '../enums/Diet.schema';
import { EnumParticipantTypeWithAggregatesFilterObjectSchema } from './EnumParticipantTypeWithAggregatesFilter.schema';
import { ParticipantTypeSchema } from '../enums/ParticipantType.schema';
import { EnumEducationLevelNullableWithAggregatesFilterObjectSchema } from './EnumEducationLevelNullableWithAggregatesFilter.schema';
import { EducationLevelSchema } from '../enums/EducationLevel.schema';
import { EnumLanguagesNullableListFilterObjectSchema } from './EnumLanguagesNullableListFilter.schema';
import { EnumAdvisorRoleNullableWithAggregatesFilterObjectSchema } from './EnumAdvisorRoleNullableWithAggregatesFilter.schema';
import { AdvisorRoleSchema } from '../enums/AdvisorRole.schema';
import { BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => UserScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => UserScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    email: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    stripeCustomerId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    sex: z
      .union([
        z.lazy(() => EnumSexWithAggregatesFilterObjectSchema),
        z.lazy(() => SexSchema),
      ])
      .optional(),
    socialName: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    cpf: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    rg: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    passport: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    phoneNumber: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    birthDate: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional(),
    nationality: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    diet: z
      .union([
        z.lazy(() => EnumDietNullableWithAggregatesFilterObjectSchema),
        z.lazy(() => DietSchema),
      ])
      .optional()
      .nullable(),
    foodRestriction: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    type: z
      .union([
        z.lazy(() => EnumParticipantTypeWithAggregatesFilterObjectSchema),
        z.lazy(() => ParticipantTypeSchema),
      ])
      .optional(),
    emergencyContactName: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    emergencyContactPhoneNumber: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    educationLevel: z
      .union([
        z.lazy(
          () => EnumEducationLevelNullableWithAggregatesFilterObjectSchema,
        ),
        z.lazy(() => EducationLevelSchema),
      ])
      .optional()
      .nullable(),
    currentYear: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    languagesSimulates: z
      .lazy(() => EnumLanguagesNullableListFilterObjectSchema)
      .optional(),
    advisorRole: z
      .union([
        z.lazy(() => EnumAdvisorRoleNullableWithAggregatesFilterObjectSchema),
        z.lazy(() => AdvisorRoleSchema),
      ])
      .optional()
      .nullable(),
    facebook: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    instagram: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    linkedin: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    leader: z
      .union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()])
      .optional(),
    delegationId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional(),
  })
  .strict();

export const UserScalarWhereWithAggregatesInputObjectSchema = Schema;
