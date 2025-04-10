import { z } from 'zod';
import { FileWhereInputObjectSchema } from './FileWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FileListRelationFilter> = z
  .object({
    every: z.lazy(() => FileWhereInputObjectSchema).optional(),
    some: z.lazy(() => FileWhereInputObjectSchema).optional(),
    none: z.lazy(() => FileWhereInputObjectSchema).optional(),
  })
  .strict();

export const FileListRelationFilterObjectSchema = Schema;
