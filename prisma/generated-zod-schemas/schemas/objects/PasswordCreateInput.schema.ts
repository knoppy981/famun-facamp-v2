import { z } from 'zod';
import { UserCreateNestedOneWithoutPasswordInputObjectSchema } from './UserCreateNestedOneWithoutPasswordInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PasswordCreateInput> = z
  .object({
    id: z.string().optional(),
    hash: z.string(),
    user: z.lazy(() => UserCreateNestedOneWithoutPasswordInputObjectSchema),
  })
  .strict();

export const PasswordCreateInputObjectSchema = Schema;
