import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutFilesInputObjectSchema } from './UserCreateWithoutFilesInput.schema';
import { UserUncheckedCreateWithoutFilesInputObjectSchema } from './UserUncheckedCreateWithoutFilesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutFilesInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutFilesInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutFilesInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutFilesInputObjectSchema = Schema;
