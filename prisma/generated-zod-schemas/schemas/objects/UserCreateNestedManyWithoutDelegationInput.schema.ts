import { z } from 'zod';
import { UserCreateWithoutDelegationInputObjectSchema } from './UserCreateWithoutDelegationInput.schema';
import { UserUncheckedCreateWithoutDelegationInputObjectSchema } from './UserUncheckedCreateWithoutDelegationInput.schema';
import { UserCreateOrConnectWithoutDelegationInputObjectSchema } from './UserCreateOrConnectWithoutDelegationInput.schema';
import { UserCreateManyDelegationInputEnvelopeObjectSchema } from './UserCreateManyDelegationInputEnvelope.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedManyWithoutDelegationInput> = z
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
    createMany: z
      .lazy(() => UserCreateManyDelegationInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => UserWhereUniqueInputObjectSchema),
        z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const UserCreateNestedManyWithoutDelegationInputObjectSchema = Schema;
