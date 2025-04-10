import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FileUncheckedCreateWithoutUserInput> = z
  .object({
    id: z.string().optional(),
    url: z.string().optional().nullable(),
    type: z.string(),
    fileName: z.string(),
    stream: z.instanceof(Buffer),
    contentType: z.string(),
    size: z.number(),
    createdAt: z.coerce.date().optional(),
  })
  .strict();

export const FileUncheckedCreateWithoutUserInputObjectSchema = Schema;
