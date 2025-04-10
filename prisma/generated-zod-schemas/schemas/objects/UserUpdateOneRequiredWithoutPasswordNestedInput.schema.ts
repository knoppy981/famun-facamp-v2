import { z } from 'zod';
import { UserCreateWithoutPasswordInputObjectSchema } from './UserCreateWithoutPasswordInput.schema';
import { UserUncheckedCreateWithoutPasswordInputObjectSchema } from './UserUncheckedCreateWithoutPasswordInput.schema';
import { UserCreateOrConnectWithoutPasswordInputObjectSchema } from './UserCreateOrConnectWithoutPasswordInput.schema';
import { UserUpsertWithoutPasswordInputObjectSchema } from './UserUpsertWithoutPasswordInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutPasswordInputObjectSchema } from './UserUpdateWithoutPasswordInput.schema';
import { UserUncheckedUpdateWithoutPasswordInputObjectSchema } from './UserUncheckedUpdateWithoutPasswordInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPasswordNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutPasswordInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutPasswordInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutPasswordInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => UserUpsertWithoutPasswordInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithoutPasswordInputObjectSchema),
          z.lazy(() => UserUncheckedUpdateWithoutPasswordInputObjectSchema),
        ])
        .optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutPasswordNestedInputObjectSchema =
  Schema;
