import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutPasswordNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutPasswordNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PasswordUpdateInput> = z
  .object({
    hash: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutPasswordNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const PasswordUpdateInputObjectSchema = Schema;
