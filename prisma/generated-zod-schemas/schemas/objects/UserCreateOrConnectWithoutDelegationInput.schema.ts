import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutDelegationInputObjectSchema } from './UserCreateWithoutDelegationInput.schema';
import { UserUncheckedCreateWithoutDelegationInputObjectSchema } from './UserUncheckedCreateWithoutDelegationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutDelegationInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutDelegationInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutDelegationInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutDelegationInputObjectSchema = Schema;
