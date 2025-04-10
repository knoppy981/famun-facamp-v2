import { z } from 'zod';
import { PaymentCreateWithoutDelegationInputObjectSchema } from './PaymentCreateWithoutDelegationInput.schema';
import { PaymentUncheckedCreateWithoutDelegationInputObjectSchema } from './PaymentUncheckedCreateWithoutDelegationInput.schema';
import { PaymentCreateOrConnectWithoutDelegationInputObjectSchema } from './PaymentCreateOrConnectWithoutDelegationInput.schema';
import { PaymentUpsertWithWhereUniqueWithoutDelegationInputObjectSchema } from './PaymentUpsertWithWhereUniqueWithoutDelegationInput.schema';
import { PaymentCreateManyDelegationInputEnvelopeObjectSchema } from './PaymentCreateManyDelegationInputEnvelope.schema';
import { PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';
import { PaymentUpdateWithWhereUniqueWithoutDelegationInputObjectSchema } from './PaymentUpdateWithWhereUniqueWithoutDelegationInput.schema';
import { PaymentUpdateManyWithWhereWithoutDelegationInputObjectSchema } from './PaymentUpdateManyWithWhereWithoutDelegationInput.schema';
import { PaymentScalarWhereInputObjectSchema } from './PaymentScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentUncheckedUpdateManyWithoutDelegationNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PaymentCreateWithoutDelegationInputObjectSchema),
          z.lazy(() => PaymentCreateWithoutDelegationInputObjectSchema).array(),
          z.lazy(
            () => PaymentUncheckedCreateWithoutDelegationInputObjectSchema,
          ),
          z
            .lazy(
              () => PaymentUncheckedCreateWithoutDelegationInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => PaymentCreateOrConnectWithoutDelegationInputObjectSchema,
          ),
          z
            .lazy(
              () => PaymentCreateOrConnectWithoutDelegationInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              PaymentUpsertWithWhereUniqueWithoutDelegationInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                PaymentUpsertWithWhereUniqueWithoutDelegationInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PaymentCreateManyDelegationInputEnvelopeObjectSchema)
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
          z.lazy(
            () =>
              PaymentUpdateWithWhereUniqueWithoutDelegationInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                PaymentUpdateWithWhereUniqueWithoutDelegationInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => PaymentUpdateManyWithWhereWithoutDelegationInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                PaymentUpdateManyWithWhereWithoutDelegationInputObjectSchema,
            )
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

export const PaymentUncheckedUpdateManyWithoutDelegationNestedInputObjectSchema =
  Schema;
