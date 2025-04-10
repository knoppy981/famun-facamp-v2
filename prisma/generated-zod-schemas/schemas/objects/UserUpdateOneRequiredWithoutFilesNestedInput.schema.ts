import { z } from 'zod';
import { UserCreateWithoutFilesInputObjectSchema } from './UserCreateWithoutFilesInput.schema';
import { UserUncheckedCreateWithoutFilesInputObjectSchema } from './UserUncheckedCreateWithoutFilesInput.schema';
import { UserCreateOrConnectWithoutFilesInputObjectSchema } from './UserCreateOrConnectWithoutFilesInput.schema';
import { UserUpsertWithoutFilesInputObjectSchema } from './UserUpsertWithoutFilesInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutFilesInputObjectSchema } from './UserUpdateWithoutFilesInput.schema';
import { UserUncheckedUpdateWithoutFilesInputObjectSchema } from './UserUncheckedUpdateWithoutFilesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFilesNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutFilesInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutFilesInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutFilesInputObjectSchema)
      .optional(),
    upsert: z.lazy(() => UserUpsertWithoutFilesInputObjectSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateWithoutFilesInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutFilesInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const UserUpdateOneRequiredWithoutFilesNestedInputObjectSchema = Schema;
