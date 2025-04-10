import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserCountOrderByAggregateInputObjectSchema } from './UserCountOrderByAggregateInput.schema';
import { UserMaxOrderByAggregateInputObjectSchema } from './UserMaxOrderByAggregateInput.schema';
import { UserMinOrderByAggregateInputObjectSchema } from './UserMinOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    stripeCustomerId: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    sex: z.lazy(() => SortOrderSchema).optional(),
    socialName: z.lazy(() => SortOrderSchema).optional(),
    cpf: z.lazy(() => SortOrderSchema).optional(),
    rg: z.lazy(() => SortOrderSchema).optional(),
    passport: z.lazy(() => SortOrderSchema).optional(),
    phoneNumber: z.lazy(() => SortOrderSchema).optional(),
    birthDate: z.lazy(() => SortOrderSchema).optional(),
    nationality: z.lazy(() => SortOrderSchema).optional(),
    diet: z.lazy(() => SortOrderSchema).optional(),
    foodRestriction: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    emergencyContactName: z.lazy(() => SortOrderSchema).optional(),
    emergencyContactPhoneNumber: z.lazy(() => SortOrderSchema).optional(),
    educationLevel: z.lazy(() => SortOrderSchema).optional(),
    currentYear: z.lazy(() => SortOrderSchema).optional(),
    languagesSimulates: z.lazy(() => SortOrderSchema).optional(),
    advisorRole: z.lazy(() => SortOrderSchema).optional(),
    facebook: z.lazy(() => SortOrderSchema).optional(),
    instagram: z.lazy(() => SortOrderSchema).optional(),
    linkedin: z.lazy(() => SortOrderSchema).optional(),
    leader: z.lazy(() => SortOrderSchema).optional(),
    delegationId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => UserCountOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => UserMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => UserMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const UserOrderByWithAggregationInputObjectSchema = Schema;
