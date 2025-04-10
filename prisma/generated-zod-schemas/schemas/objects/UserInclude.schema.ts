import { z } from 'zod';
import { PasswordArgsObjectSchema } from './PasswordArgs.schema';
import { PaymentFindManySchema } from '../findManyPayment.schema';
import { FileFindManySchema } from '../findManyFile.schema';
import { DelegationArgsObjectSchema } from './DelegationArgs.schema';
import { UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserInclude> = z
  .object({
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
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)])
      .optional(),
  })
  .strict();

export const UserIncludeObjectSchema = Schema;
