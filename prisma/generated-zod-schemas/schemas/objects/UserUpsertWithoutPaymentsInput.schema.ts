import { z } from 'zod';
import { UserUpdateWithoutPaymentsInputObjectSchema } from './UserUpdateWithoutPaymentsInput.schema';
import { UserUncheckedUpdateWithoutPaymentsInputObjectSchema } from './UserUncheckedUpdateWithoutPaymentsInput.schema';
import { UserCreateWithoutPaymentsInputObjectSchema } from './UserCreateWithoutPaymentsInput.schema';
import { UserUncheckedCreateWithoutPaymentsInputObjectSchema } from './UserUncheckedCreateWithoutPaymentsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutPaymentsInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutPaymentsInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutPaymentsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutPaymentsInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutPaymentsInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutPaymentsInputObjectSchema = Schema;
