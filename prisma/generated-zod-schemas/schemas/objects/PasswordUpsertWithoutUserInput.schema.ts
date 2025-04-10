import { z } from 'zod';
import { PasswordUpdateWithoutUserInputObjectSchema } from './PasswordUpdateWithoutUserInput.schema';
import { PasswordUncheckedUpdateWithoutUserInputObjectSchema } from './PasswordUncheckedUpdateWithoutUserInput.schema';
import { PasswordCreateWithoutUserInputObjectSchema } from './PasswordCreateWithoutUserInput.schema';
import { PasswordUncheckedCreateWithoutUserInputObjectSchema } from './PasswordUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PasswordUpsertWithoutUserInput> = z
  .object({
    update: z.union([
      z.lazy(() => PasswordUpdateWithoutUserInputObjectSchema),
      z.lazy(() => PasswordUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => PasswordCreateWithoutUserInputObjectSchema),
      z.lazy(() => PasswordUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const PasswordUpsertWithoutUserInputObjectSchema = Schema;
