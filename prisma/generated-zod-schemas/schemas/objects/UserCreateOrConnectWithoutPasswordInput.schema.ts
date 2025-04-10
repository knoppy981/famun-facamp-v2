import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutPasswordInputObjectSchema } from './UserCreateWithoutPasswordInput.schema';
import { UserUncheckedCreateWithoutPasswordInputObjectSchema } from './UserUncheckedCreateWithoutPasswordInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutPasswordInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutPasswordInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutPasswordInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutPasswordInputObjectSchema = Schema;
