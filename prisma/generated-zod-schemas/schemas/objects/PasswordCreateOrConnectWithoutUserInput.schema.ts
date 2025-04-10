import { z } from 'zod';
import { PasswordWhereUniqueInputObjectSchema } from './PasswordWhereUniqueInput.schema';
import { PasswordCreateWithoutUserInputObjectSchema } from './PasswordCreateWithoutUserInput.schema';
import { PasswordUncheckedCreateWithoutUserInputObjectSchema } from './PasswordUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PasswordCreateOrConnectWithoutUserInput> = z
  .object({
    where: z.lazy(() => PasswordWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => PasswordCreateWithoutUserInputObjectSchema),
      z.lazy(() => PasswordUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const PasswordCreateOrConnectWithoutUserInputObjectSchema = Schema;
