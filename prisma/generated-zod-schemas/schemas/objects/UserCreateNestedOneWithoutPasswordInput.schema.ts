import { z } from 'zod';
import { UserCreateWithoutPasswordInputObjectSchema } from './UserCreateWithoutPasswordInput.schema';
import { UserUncheckedCreateWithoutPasswordInputObjectSchema } from './UserUncheckedCreateWithoutPasswordInput.schema';
import { UserCreateOrConnectWithoutPasswordInputObjectSchema } from './UserCreateOrConnectWithoutPasswordInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutPasswordInput> = z
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
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateNestedOneWithoutPasswordInputObjectSchema = Schema;
