import { z } from 'zod';
import { FileCreateManyUserInputObjectSchema } from './FileCreateManyUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FileCreateManyUserInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => FileCreateManyUserInputObjectSchema),
      z.lazy(() => FileCreateManyUserInputObjectSchema).array(),
    ]),
  })
  .strict();

export const FileCreateManyUserInputEnvelopeObjectSchema = Schema;
