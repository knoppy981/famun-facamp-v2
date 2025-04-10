import { z } from 'zod';
import { UserUpdateWithoutFilesInputObjectSchema } from './UserUpdateWithoutFilesInput.schema';
import { UserUncheckedUpdateWithoutFilesInputObjectSchema } from './UserUncheckedUpdateWithoutFilesInput.schema';
import { UserCreateWithoutFilesInputObjectSchema } from './UserCreateWithoutFilesInput.schema';
import { UserUncheckedCreateWithoutFilesInputObjectSchema } from './UserUncheckedCreateWithoutFilesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutFilesInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutFilesInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutFilesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutFilesInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutFilesInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutFilesInputObjectSchema = Schema;
