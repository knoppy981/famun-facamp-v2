import { z } from 'zod';
import { PaymentCreateWithoutUserInputObjectSchema } from './PaymentCreateWithoutUserInput.schema';
import { PaymentUncheckedCreateWithoutUserInputObjectSchema } from './PaymentUncheckedCreateWithoutUserInput.schema';
import { PaymentCreateOrConnectWithoutUserInputObjectSchema } from './PaymentCreateOrConnectWithoutUserInput.schema';
import { PaymentUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './PaymentUpsertWithWhereUniqueWithoutUserInput.schema';
import { PaymentCreateManyUserInputEnvelopeObjectSchema } from './PaymentCreateManyUserInputEnvelope.schema';
import { PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';
import { PaymentUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './PaymentUpdateWithWhereUniqueWithoutUserInput.schema';
import { PaymentUpdateManyWithWhereWithoutUserInputObjectSchema } from './PaymentUpdateManyWithWhereWithoutUserInput.schema';
import { PaymentScalarWhereInputObjectSchema } from './PaymentScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentUpdateManyWithoutUserNestedInput> = z
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
    upsert: z
      .union([
        z.lazy(() => PaymentUpsertWithWhereUniqueWithoutUserInputObjectSchema),
        z
          .lazy(() => PaymentUpsertWithWhereUniqueWithoutUserInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => PaymentCreateManyUserInputEnvelopeObjectSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => PaymentWhereUniqueInputObjectSchema),
        z.lazy(() => PaymentWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => PaymentWhereUniqueInputObjectSchema),
        z.lazy(() => PaymentWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => PaymentWhereUniqueInputObjectSchema),
        z.lazy(() => PaymentWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => PaymentWhereUniqueInputObjectSchema),
        z.lazy(() => PaymentWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => PaymentUpdateWithWhereUniqueWithoutUserInputObjectSchema),
        z
          .lazy(() => PaymentUpdateWithWhereUniqueWithoutUserInputObjectSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => PaymentUpdateManyWithWhereWithoutUserInputObjectSchema),
        z
          .lazy(() => PaymentUpdateManyWithWhereWithoutUserInputObjectSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => PaymentScalarWhereInputObjectSchema),
        z.lazy(() => PaymentScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const PaymentUpdateManyWithoutUserNestedInputObjectSchema = Schema;
