import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutDelegationInputObjectSchema } from './UserUpdateWithoutDelegationInput.schema';
import { UserUncheckedUpdateWithoutDelegationInputObjectSchema } from './UserUncheckedUpdateWithoutDelegationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutDelegationInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => UserUpdateWithoutDelegationInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutDelegationInputObjectSchema),
      ]),
    })
    .strict();

export const UserUpdateWithWhereUniqueWithoutDelegationInputObjectSchema =
  Schema;
