import { z } from 'zod';
import { PasswordArgsObjectSchema } from './PasswordArgs.schema';
import { PaymentFindManySchema } from '../findManyPayment.schema';
import { FileFindManySchema } from '../findManyFile.schema';
import { DelegationArgsObjectSchema } from './DelegationArgs.schema';
import { UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    email: z.boolean().optional(),
    stripeCustomerId: z.boolean().optional(),
    name: z.boolean().optional(),
    sex: z.boolean().optional(),
    socialName: z.boolean().optional(),
    cpf: z.boolean().optional(),
    rg: z.boolean().optional(),
    passport: z.boolean().optional(),
    phoneNumber: z.boolean().optional(),
    birthDate: z.boolean().optional(),
    nationality: z.boolean().optional(),
    diet: z.boolean().optional(),
    foodRestriction: z.boolean().optional(),
    type: z.boolean().optional(),
    emergencyContactName: z.boolean().optional(),
    emergencyContactPhoneNumber: z.boolean().optional(),
    educationLevel: z.boolean().optional(),
    currentYear: z.boolean().optional(),
    languagesSimulates: z.boolean().optional(),
    councilPreference: z.boolean().optional(),
    advisorRole: z.boolean().optional(),
    facebook: z.boolean().optional(),
    instagram: z.boolean().optional(),
    linkedin: z.boolean().optional(),
    leader: z.boolean().optional(),
    password: z
      .union([z.boolean(), z.lazy(() => PasswordArgsObjectSchema)])
      .optional(),
    payments: z
      .union([z.boolean(), z.lazy(() => PaymentFindManySchema)])
      .optional(),
    files: z.union([z.boolean(), z.lazy(() => FileFindManySchema)]).optional(),
    delegation: z
      .union([z.boolean(), z.lazy(() => DelegationArgsObjectSchema)])
      .optional(),
    delegationId: z.boolean().optional(),
    confirmationCode: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)])
      .optional(),
  })
  .strict();

export const UserSelectObjectSchema = Schema;
