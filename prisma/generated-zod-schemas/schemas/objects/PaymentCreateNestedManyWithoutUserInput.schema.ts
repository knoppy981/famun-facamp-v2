import { z } from 'zod';
import { PaymentCreateWithoutUserInputObjectSchema } from './PaymentCreateWithoutUserInput.schema';
import { PaymentUncheckedCreateWithoutUserInputObjectSchema } from './PaymentUncheckedCreateWithoutUserInput.schema';
import { PaymentCreateOrConnectWithoutUserInputObjectSchema } from './PaymentCreateOrConnectWithoutUserInput.schema';
import { PaymentCreateManyUserInputEnvelopeObjectSchema } from './PaymentCreateManyUserInputEnvelope.schema';
import { PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentCreateNestedManyWithoutUserInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => PaymentCreateWithoutUserInputObjectSchema),
        z.lazy(() => PaymentCreateWithoutUserInputObjectSchema).array(),
        z.lazy(() => PaymentUncheckedCreateWithoutUserInputObjectSchema),
        z
          .lazy(() => PaymentUncheckedCreateWithoutUserInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => PaymentCreateOrConnectWithoutUserInputObjectSchema),
        z
          .lazy(() => PaymentCreateOrConnectWithoutUserInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => PaymentCreateManyUserInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => PaymentWhereUniqueInputObjectSchema),
        z.lazy(() => PaymentWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const PaymentCreateNestedManyWithoutUserInputObjectSchema = Schema;
