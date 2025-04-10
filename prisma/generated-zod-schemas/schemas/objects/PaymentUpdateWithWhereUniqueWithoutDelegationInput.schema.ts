import { z } from 'zod';
import { PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';
import { PaymentUpdateWithoutDelegationInputObjectSchema } from './PaymentUpdateWithoutDelegationInput.schema';
import { PaymentUncheckedUpdateWithoutDelegationInputObjectSchema } from './PaymentUncheckedUpdateWithoutDelegationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentUpdateWithWhereUniqueWithoutDelegationInput> =
  z
    .object({
      where: z.lazy(() => PaymentWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => PaymentUpdateWithoutDelegationInputObjectSchema),
        z.lazy(() => PaymentUncheckedUpdateWithoutDelegationInputObjectSchema),
      ]),
    })
    .strict();

export const PaymentUpdateWithWhereUniqueWithoutDelegationInputObjectSchema =
  Schema;
