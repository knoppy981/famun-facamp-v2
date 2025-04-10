import { z } from 'zod';
import { PasswordCreateWithoutUserInputObjectSchema } from './PasswordCreateWithoutUserInput.schema';
import { PasswordUncheckedCreateWithoutUserInputObjectSchema } from './PasswordUncheckedCreateWithoutUserInput.schema';
import { PasswordCreateOrConnectWithoutUserInputObjectSchema } from './PasswordCreateOrConnectWithoutUserInput.schema';
import { PasswordUpsertWithoutUserInputObjectSchema } from './PasswordUpsertWithoutUserInput.schema';
import { PasswordWhereUniqueInputObjectSchema } from './PasswordWhereUniqueInput.schema';
import { PasswordUpdateWithoutUserInputObjectSchema } from './PasswordUpdateWithoutUserInput.schema';
import { PasswordUncheckedUpdateWithoutUserInputObjectSchema } from './PasswordUncheckedUpdateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PasswordUncheckedUpdateOneWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PasswordCreateWithoutUserInputObjectSchema),
          z.lazy(() => PasswordUncheckedCreateWithoutUserInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => PasswordCreateOrConnectWithoutUserInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => PasswordUpsertWithoutUserInputObjectSchema)
        .optional(),
      disconnect: z.boolean().optional(),
      delete: z.boolean().optional(),
      connect: z.lazy(() => PasswordWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => PasswordUpdateWithoutUserInputObjectSchema),
          z.lazy(() => PasswordUncheckedUpdateWithoutUserInputObjectSchema),
        ])
        .optional(),
    })
    .strict();

export const PasswordUncheckedUpdateOneWithoutUserNestedInputObjectSchema =
  Schema;
