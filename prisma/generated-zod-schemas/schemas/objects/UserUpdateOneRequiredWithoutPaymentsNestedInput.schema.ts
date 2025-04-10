import { z } from 'zod';
import { UserCreateWithoutPaymentsInputObjectSchema } from './UserCreateWithoutPaymentsInput.schema';
import { UserUncheckedCreateWithoutPaymentsInputObjectSchema } from './UserUncheckedCreateWithoutPaymentsInput.schema';
import { UserCreateOrConnectWithoutPaymentsInputObjectSchema } from './UserCreateOrConnectWithoutPaymentsInput.schema';
import { UserUpsertWithoutPaymentsInputObjectSchema } from './UserUpsertWithoutPaymentsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutPaymentsInputObjectSchema } from './UserUpdateWithoutPaymentsInput.schema';
import { UserUncheckedUpdateWithoutPaymentsInputObjectSchema } from './UserUncheckedUpdateWithoutPaymentsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPaymentsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutPaymentsInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutPaymentsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutPaymentsInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => UserUpsertWithoutPaymentsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithoutPaymentsInputObjectSchema),
          z.lazy(() => UserUncheckedUpdateWithoutPaymentsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutPaymentsNestedInputObjectSchema =
  Schema;
