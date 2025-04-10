import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutDelegationInputObjectSchema } from './UserUpdateWithoutDelegationInput.schema';
import { UserUncheckedUpdateWithoutDelegationInputObjectSchema } from './UserUncheckedUpdateWithoutDelegationInput.schema';
import { UserCreateWithoutDelegationInputObjectSchema } from './UserCreateWithoutDelegationInput.schema';
import { UserUncheckedCreateWithoutDelegationInputObjectSchema } from './UserUncheckedCreateWithoutDelegationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutDelegationInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => UserUpdateWithoutDelegationInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutDelegationInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutDelegationInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutDelegationInputObjectSchema),
      ]),
    })
    .strict();

export const UserUpsertWithWhereUniqueWithoutDelegationInputObjectSchema =
  Schema;
