import { z } from 'zod';
import { PaymentCreateManyDelegationInputObjectSchema } from './PaymentCreateManyDelegationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentCreateManyDelegationInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => PaymentCreateManyDelegationInputObjectSchema),
      z.lazy(() => PaymentCreateManyDelegationInputObjectSchema).array(),
    ]),
  })
  .strict();

export const PaymentCreateManyDelegationInputEnvelopeObjectSchema = Schema;
