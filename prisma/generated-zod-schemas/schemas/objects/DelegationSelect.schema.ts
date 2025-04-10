import { z } from 'zod';
import { UserFindManySchema } from '../findManyUser.schema';
import { PaymentFindManySchema } from '../findManyPayment.schema';
import { DelegationCountOutputTypeArgsObjectSchema } from './DelegationCountOutputTypeArgs.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationSelect> = z
  .object({
    id: z.boolean().optional(),
    code: z.boolean().optional(),
    inviteLink: z.boolean().optional(),
    school: z.boolean().optional(),
    phoneNumber: z.boolean().optional(),
    paymentExpirationDate: z.boolean().optional(),
    participationMethod: z.boolean().optional(),
    address: z.boolean().optional(),
    maxDelegates: z.boolean().optional(),
    maxAdvisors: z.boolean().optional(),
    users: z.union([z.boolean(), z.lazy(() => UserFindManySchema)]).optional(),
    payments: z
      .union([z.boolean(), z.lazy(() => PaymentFindManySchema)])
      .optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z
      .union([
        z.boolean(),
        z.lazy(() => DelegationCountOutputTypeArgsObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const DelegationSelectObjectSchema = Schema;
