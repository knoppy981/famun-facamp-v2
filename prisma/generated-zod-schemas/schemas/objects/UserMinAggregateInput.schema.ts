import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    email: z.literal(true).optional(),
    stripeCustomerId: z.literal(true).optional(),
    name: z.literal(true).optional(),
    sex: z.literal(true).optional(),
    socialName: z.literal(true).optional(),
    cpf: z.literal(true).optional(),
    rg: z.literal(true).optional(),
    passport: z.literal(true).optional(),
    phoneNumber: z.literal(true).optional(),
    birthDate: z.literal(true).optional(),
    nationality: z.literal(true).optional(),
    diet: z.literal(true).optional(),
    foodRestriction: z.literal(true).optional(),
    type: z.literal(true).optional(),
    emergencyContactName: z.literal(true).optional(),
    emergencyContactPhoneNumber: z.literal(true).optional(),
    educationLevel: z.literal(true).optional(),
    currentYear: z.literal(true).optional(),
    advisorRole: z.literal(true).optional(),
    facebook: z.literal(true).optional(),
    instagram: z.literal(true).optional(),
    linkedin: z.literal(true).optional(),
    leader: z.literal(true).optional(),
    delegationId: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
  })
  .strict();

export const UserMinAggregateInputObjectSchema = Schema;
