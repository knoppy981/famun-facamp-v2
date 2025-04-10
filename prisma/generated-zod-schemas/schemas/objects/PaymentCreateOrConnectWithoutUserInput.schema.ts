import { z } from 'zod';
import { PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';
import { PaymentCreateWithoutUserInputObjectSchema } from './PaymentCreateWithoutUserInput.schema';
import { PaymentUncheckedCreateWithoutUserInputObjectSchema } from './PaymentUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentCreateOrConnectWithoutUserInput> = z
  .object({
    where: z.lazy(() => PaymentWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => PaymentCreateWithoutUserInputObjectSchema),
      z.lazy(() => PaymentUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const PaymentCreateOrConnectWithoutUserInputObjectSchema = Schema;
