import { z } from 'zod';
import { UserUpdateWithoutPasswordInputObjectSchema } from './UserUpdateWithoutPasswordInput.schema';
import { UserUncheckedUpdateWithoutPasswordInputObjectSchema } from './UserUncheckedUpdateWithoutPasswordInput.schema';
import { UserCreateWithoutPasswordInputObjectSchema } from './UserCreateWithoutPasswordInput.schema';
import { UserUncheckedCreateWithoutPasswordInputObjectSchema } from './UserUncheckedCreateWithoutPasswordInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutPasswordInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutPasswordInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutPasswordInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutPasswordInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutPasswordInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutPasswordInputObjectSchema = Schema;
