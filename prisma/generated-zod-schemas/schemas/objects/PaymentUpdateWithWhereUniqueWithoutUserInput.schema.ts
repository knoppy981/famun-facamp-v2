import { z } from 'zod';
import { PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';
import { PaymentUpdateWithoutUserInputObjectSchema } from './PaymentUpdateWithoutUserInput.schema';
import { PaymentUncheckedUpdateWithoutUserInputObjectSchema } from './PaymentUncheckedUpdateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentUpdateWithWhereUniqueWithoutUserInput> = z
  .object({
    where: z.lazy(() => PaymentWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => PaymentUpdateWithoutUserInputObjectSchema),
      z.lazy(() => PaymentUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const PaymentUpdateWithWhereUniqueWithoutUserInputObjectSchema = Schema;
