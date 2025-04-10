import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FileTypeUserIdCompoundUniqueInput> = z
  .object({
    type: z.string(),
    userId: z.string(),
  })
  .strict();

export const FileTypeUserIdCompoundUniqueInputObjectSchema = Schema;
