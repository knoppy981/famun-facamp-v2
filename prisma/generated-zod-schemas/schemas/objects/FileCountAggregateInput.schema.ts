import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FileCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    userId: z.literal(true).optional(),
    url: z.literal(true).optional(),
    type: z.literal(true).optional(),
    fileName: z.literal(true).optional(),
    stream: z.literal(true).optional(),
    contentType: z.literal(true).optional(),
    size: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const FileCountAggregateInputObjectSchema = Schema;
