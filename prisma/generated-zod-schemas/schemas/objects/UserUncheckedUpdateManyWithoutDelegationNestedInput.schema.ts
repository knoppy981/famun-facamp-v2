import { z } from 'zod';
import { UserCreateWithoutDelegationInputObjectSchema } from './UserCreateWithoutDelegationInput.schema';
import { UserUncheckedCreateWithoutDelegationInputObjectSchema } from './UserUncheckedCreateWithoutDelegationInput.schema';
import { UserCreateOrConnectWithoutDelegationInputObjectSchema } from './UserCreateOrConnectWithoutDelegationInput.schema';
import { UserUpsertWithWhereUniqueWithoutDelegationInputObjectSchema } from './UserUpsertWithWhereUniqueWithoutDelegationInput.schema';
import { UserCreateManyDelegationInputEnvelopeObjectSchema } from './UserCreateManyDelegationInputEnvelope.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithWhereUniqueWithoutDelegationInputObjectSchema } from './UserUpdateWithWhereUniqueWithoutDelegationInput.schema';
import { UserUpdateManyWithWhereWithoutDelegationInputObjectSchema } from './UserUpdateManyWithWhereWithoutDelegationInput.schema';
import { UserScalarWhereInputObjectSchema } from './UserScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutDelegationNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutDelegationInputObjectSchema),
          z.lazy(() => UserCreateWithoutDelegationInputObjectSchema).array(),
          z.lazy(() => UserUncheckedCreateWithoutDelegationInputObjectSchema),
          z
            .lazy(() => UserUncheckedCreateWithoutDelegationInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserCreateOrConnectWithoutDelegationInputObjectSchema),
          z
            .lazy(() => UserCreateOrConnectWithoutDelegationInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => UserUpsertWithWhereUniqueWithoutDelegationInputObjectSchema,
          ),
          z
            .lazy(
              () => UserUpsertWithWhereUniqueWithoutDelegationInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UserCreateManyDelegationInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => UserWhereUniqueInputObjectSchema),
          z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserWhereUniqueInputObjectSchema),
          z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserWhereUniqueInputObjectSchema),
          z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserWhereUniqueInputObjectSchema),
          z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => UserUpdateWithWhereUniqueWithoutDelegationInputObjectSchema,
          ),
          z
            .lazy(
              () => UserUpdateWithWhereUniqueWithoutDelegationInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => UserUpdateManyWithWhereWithoutDelegationInputObjectSchema,
          ),
          z
            .lazy(
              () => UserUpdateManyWithWhereWithoutDelegationInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserScalarWhereInputObjectSchema),
          z.lazy(() => UserScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateManyWithoutDelegationNestedInputObjectSchema =
  Schema;
