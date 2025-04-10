import { z } from 'zod';
import { PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';
import { PaymentCreateWithoutDelegationInputObjectSchema } from './PaymentCreateWithoutDelegationInput.schema';
import { PaymentUncheckedCreateWithoutDelegationInputObjectSchema } from './PaymentUncheckedCreateWithoutDelegationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentCreateOrConnectWithoutDelegationInput> = z
  .object({
    where: z.lazy(() => PaymentWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => PaymentCreateWithoutDelegationInputObjectSchema),
      z.lazy(() => PaymentUncheckedCreateWithoutDelegationInputObjectSchema),
    ]),
  })
  .strict();

export const PaymentCreateOrConnectWithoutDelegationInputObjectSchema = Schema;
