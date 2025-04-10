import { z } from 'zod';
import { PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';
import { PaymentUpdateWithoutUserInputObjectSchema } from './PaymentUpdateWithoutUserInput.schema';
import { PaymentUncheckedUpdateWithoutUserInputObjectSchema } from './PaymentUncheckedUpdateWithoutUserInput.schema';
import { PaymentCreateWithoutUserInputObjectSchema } from './PaymentCreateWithoutUserInput.schema';
import { PaymentUncheckedCreateWithoutUserInputObjectSchema } from './PaymentUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentUpsertWithWhereUniqueWithoutUserInput> = z
  .object({
    where: z.lazy(() => PaymentWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => PaymentUpdateWithoutUserInputObjectSchema),
      z.lazy(() => PaymentUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => PaymentCreateWithoutUserInputObjectSchema),
      z.lazy(() => PaymentUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const PaymentUpsertWithWhereUniqueWithoutUserInputObjectSchema = Schema;
