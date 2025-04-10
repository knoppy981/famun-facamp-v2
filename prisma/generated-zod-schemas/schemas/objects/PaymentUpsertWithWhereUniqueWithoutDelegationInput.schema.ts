import { z } from 'zod';
import { PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';
import { PaymentUpdateWithoutDelegationInputObjectSchema } from './PaymentUpdateWithoutDelegationInput.schema';
import { PaymentUncheckedUpdateWithoutDelegationInputObjectSchema } from './PaymentUncheckedUpdateWithoutDelegationInput.schema';
import { PaymentCreateWithoutDelegationInputObjectSchema } from './PaymentCreateWithoutDelegationInput.schema';
import { PaymentUncheckedCreateWithoutDelegationInputObjectSchema } from './PaymentUncheckedCreateWithoutDelegationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentUpsertWithWhereUniqueWithoutDelegationInput> =
  z
    .object({
      where: z.lazy(() => PaymentWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => PaymentUpdateWithoutDelegationInputObjectSchema),
        z.lazy(() => PaymentUncheckedUpdateWithoutDelegationInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => PaymentCreateWithoutDelegationInputObjectSchema),
        z.lazy(() => PaymentUncheckedCreateWithoutDelegationInputObjectSchema),
      ]),
    })
    .strict();

export const PaymentUpsertWithWhereUniqueWithoutDelegationInputObjectSchema =
  Schema;
