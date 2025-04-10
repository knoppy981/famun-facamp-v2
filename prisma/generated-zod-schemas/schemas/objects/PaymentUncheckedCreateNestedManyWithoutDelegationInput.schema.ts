import { z } from 'zod';
import { PaymentCreateWithoutDelegationInputObjectSchema } from './PaymentCreateWithoutDelegationInput.schema';
import { PaymentUncheckedCreateWithoutDelegationInputObjectSchema } from './PaymentUncheckedCreateWithoutDelegationInput.schema';
import { PaymentCreateOrConnectWithoutDelegationInputObjectSchema } from './PaymentCreateOrConnectWithoutDelegationInput.schema';
import { PaymentCreateManyDelegationInputEnvelopeObjectSchema } from './PaymentCreateManyDelegationInputEnvelope.schema';
import { PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentUncheckedCreateNestedManyWithoutDelegationInput> =
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
      createMany: z
        .lazy(() => PaymentCreateManyDelegationInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => PaymentWhereUniqueInputObjectSchema),
          z.lazy(() => PaymentWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PaymentUncheckedCreateNestedManyWithoutDelegationInputObjectSchema =
  Schema;
