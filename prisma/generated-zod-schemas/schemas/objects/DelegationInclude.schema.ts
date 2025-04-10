import { z } from 'zod';
import { UserFindManySchema } from '../findManyUser.schema';
import { PaymentFindManySchema } from '../findManyPayment.schema';
import { DelegationCountOutputTypeArgsObjectSchema } from './DelegationCountOutputTypeArgs.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationInclude> = z
  .object({
    users: z.union([z.boolean(), z.lazy(() => UserFindManySchema)]).optional(),
    payments: z
      .union([z.boolean(), z.lazy(() => PaymentFindManySchema)])
      .optional(),
    _count: z
      .union([
        z.boolean(),
        z.lazy(() => DelegationCountOutputTypeArgsObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const DelegationIncludeObjectSchema = Schema;
