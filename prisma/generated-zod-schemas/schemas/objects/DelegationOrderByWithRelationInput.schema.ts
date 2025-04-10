import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { AddressOrderByInputObjectSchema } from './AddressOrderByInput.schema';
import { UserOrderByRelationAggregateInputObjectSchema } from './UserOrderByRelationAggregateInput.schema';
import { PaymentOrderByRelationAggregateInputObjectSchema } from './PaymentOrderByRelationAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    code: z.lazy(() => SortOrderSchema).optional(),
    inviteLink: z.lazy(() => SortOrderSchema).optional(),
    school: z.lazy(() => SortOrderSchema).optional(),
    phoneNumber: z.lazy(() => SortOrderSchema).optional(),
    paymentExpirationDate: z.lazy(() => SortOrderSchema).optional(),
    participationMethod: z.lazy(() => SortOrderSchema).optional(),
    address: z.lazy(() => AddressOrderByInputObjectSchema).optional(),
    maxDelegates: z.lazy(() => SortOrderSchema).optional(),
    maxAdvisors: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    users: z
      .lazy(() => UserOrderByRelationAggregateInputObjectSchema)
      .optional(),
    payments: z
      .lazy(() => PaymentOrderByRelationAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const DelegationOrderByWithRelationInputObjectSchema = Schema;
