import { z } from 'zod';
import { NestedBytesFilterObjectSchema } from './NestedBytesFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.BytesFilter> = z
  .object({
    equals: z.instanceof(Buffer).optional(),
    in: z
      .union([z.instanceof(Buffer).array(), z.instanceof(Buffer)])
      .optional(),
    notIn: z
      .union([z.instanceof(Buffer).array(), z.instanceof(Buffer)])
      .optional(),
    not: z
      .union([
        z.instanceof(Buffer),
        z.lazy(() => NestedBytesFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const BytesFilterObjectSchema = Schema;
