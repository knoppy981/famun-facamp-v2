import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    code: z.lazy(() => SortOrderSchema).optional(),
    inviteLink: z.lazy(() => SortOrderSchema).optional(),
    school: z.lazy(() => SortOrderSchema).optional(),
    phoneNumber: z.lazy(() => SortOrderSchema).optional(),
    paymentExpirationDate: z.lazy(() => SortOrderSchema).optional(),
    participationMethod: z.lazy(() => SortOrderSchema).optional(),
    maxDelegates: z.lazy(() => SortOrderSchema).optional(),
    maxAdvisors: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const DelegationMaxOrderByAggregateInputObjectSchema = Schema;
