import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { DelegationCountOrderByAggregateInputObjectSchema } from './DelegationCountOrderByAggregateInput.schema';
import { DelegationAvgOrderByAggregateInputObjectSchema } from './DelegationAvgOrderByAggregateInput.schema';
import { DelegationMaxOrderByAggregateInputObjectSchema } from './DelegationMaxOrderByAggregateInput.schema';
import { DelegationMinOrderByAggregateInputObjectSchema } from './DelegationMinOrderByAggregateInput.schema';
import { DelegationSumOrderByAggregateInputObjectSchema } from './DelegationSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationOrderByWithAggregationInput> = z
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
    _count: z
      .lazy(() => DelegationCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z
      .lazy(() => DelegationAvgOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z
      .lazy(() => DelegationMaxOrderByAggregateInputObjectSchema)
      .optional(),
    _min: z
      .lazy(() => DelegationMinOrderByAggregateInputObjectSchema)
      .optional(),
    _sum: z
      .lazy(() => DelegationSumOrderByAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const DelegationOrderByWithAggregationInputObjectSchema = Schema;
