import { z } from 'zod';
import { UserArgsObjectSchema } from './UserArgs.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FileSelect> = z
  .object({
    id: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    userId: z.boolean().optional(),
    url: z.boolean().optional(),
    type: z.boolean().optional(),
    fileName: z.boolean().optional(),
    stream: z.boolean().optional(),
    contentType: z.boolean().optional(),
    size: z.boolean().optional(),
    createdAt: z.boolean().optional(),
  })
  .strict();

export const FileSelectObjectSchema = Schema;
