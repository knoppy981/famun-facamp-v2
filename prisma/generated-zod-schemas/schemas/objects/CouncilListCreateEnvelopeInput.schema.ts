import { z } from 'zod';
import { CouncilCreateInputObjectSchema } from './CouncilCreateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CouncilListCreateEnvelopeInput> = z
  .object({
    set: z
      .union([
        z.lazy(() => CouncilCreateInputObjectSchema),
        z.lazy(() => CouncilCreateInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const CouncilListCreateEnvelopeInputObjectSchema = Schema;
