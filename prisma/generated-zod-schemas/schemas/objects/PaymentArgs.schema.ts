import { z } from 'zod';
import { PaymentSelectObjectSchema } from './PaymentSelect.schema';
import { PaymentIncludeObjectSchema } from './PaymentInclude.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentArgs> = z
  .object({
    select: z.lazy(() => PaymentSelectObjectSchema).optional(),
    include: z.lazy(() => PaymentIncludeObjectSchema).optional(),
  })
  .strict();

export const PaymentArgsObjectSchema = Schema;
