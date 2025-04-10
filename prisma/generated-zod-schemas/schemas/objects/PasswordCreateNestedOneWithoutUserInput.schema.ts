import { z } from 'zod';
import { PasswordCreateWithoutUserInputObjectSchema } from './PasswordCreateWithoutUserInput.schema';
import { PasswordUncheckedCreateWithoutUserInputObjectSchema } from './PasswordUncheckedCreateWithoutUserInput.schema';
import { PasswordCreateOrConnectWithoutUserInputObjectSchema } from './PasswordCreateOrConnectWithoutUserInput.schema';
import { PasswordWhereUniqueInputObjectSchema } from './PasswordWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PasswordCreateNestedOneWithoutUserInput> = z
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
    connect: z.lazy(() => PasswordWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const PasswordCreateNestedOneWithoutUserInputObjectSchema = Schema;
