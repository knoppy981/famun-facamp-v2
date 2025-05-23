import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FileCreateManyInput> = z
  .object({
    id: z.string().optional(),
    userId: z.string(),
    url: z.string().optional().nullable(),
    type: z.string(),
    fileName: z.string(),
    stream: z.instanceof(Buffer),
    contentType: z.string(),
    size: z.number(),
    createdAt: z.coerce.date().optional(),
  })
  .strict();

export const FileCreateManyInputObjectSchema = Schema;
