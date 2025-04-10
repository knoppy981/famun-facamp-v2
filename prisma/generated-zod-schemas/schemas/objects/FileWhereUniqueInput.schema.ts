import { z } from 'zod';
import { FileTypeUserIdCompoundUniqueInputObjectSchema } from './FileTypeUserIdCompoundUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FileWhereUniqueInput> = z
  .object({
    id: z.string().optional(),
    type_userId: z
      .lazy(() => FileTypeUserIdCompoundUniqueInputObjectSchema)
      .optional(),
  })
  .strict();

export const FileWhereUniqueInputObjectSchema = Schema;
