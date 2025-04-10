import { z } from 'zod';
import { DelegationArgsObjectSchema } from './DelegationArgs.schema';
import { UserArgsObjectSchema } from './UserArgs.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentInclude> = z
  .object({
    delegation: z
      .union([z.boolean(), z.lazy(() => DelegationArgsObjectSchema)])
      .optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  })
  .strict();

export const PaymentIncludeObjectSchema = Schema;
