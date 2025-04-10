import { z } from 'zod';
import { UserCreateWithoutPaymentsInputObjectSchema } from './UserCreateWithoutPaymentsInput.schema';
import { UserUncheckedCreateWithoutPaymentsInputObjectSchema } from './UserUncheckedCreateWithoutPaymentsInput.schema';
import { UserCreateOrConnectWithoutPaymentsInputObjectSchema } from './UserCreateOrConnectWithoutPaymentsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutPaymentsInput> = z
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
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateNestedOneWithoutPaymentsInputObjectSchema = Schema;
