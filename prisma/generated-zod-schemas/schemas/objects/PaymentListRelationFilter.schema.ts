import { z } from 'zod';
import { PaymentWhereInputObjectSchema } from './PaymentWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentListRelationFilter> = z
  .object({
    every: z.lazy(() => PaymentWhereInputObjectSchema).optional(),
    some: z.lazy(() => PaymentWhereInputObjectSchema).optional(),
    none: z.lazy(() => PaymentWhereInputObjectSchema).optional(),
  })
  .strict();

export const PaymentListRelationFilterObjectSchema = Schema;
