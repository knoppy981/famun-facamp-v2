import { z } from 'zod';
import { CouncilCreateInputObjectSchema } from './CouncilCreateInput.schema';
import { CouncilUpdateManyInputObjectSchema } from './CouncilUpdateManyInput.schema';
import { CouncilDeleteManyInputObjectSchema } from './CouncilDeleteManyInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CouncilListUpdateEnvelopeInput> = z
  .object({
    set: z
      .union([
        z.lazy(() => CouncilCreateInputObjectSchema),
        z.lazy(() => CouncilCreateInputObjectSchema).array(),
      ])
      .optional(),
    push: z
      .union([
        z.lazy(() => CouncilCreateInputObjectSchema),
        z.lazy(() => CouncilCreateInputObjectSchema).array(),
      ])
      .optional(),
    updateMany: z.lazy(() => CouncilUpdateManyInputObjectSchema).optional(),
    deleteMany: z.lazy(() => CouncilDeleteManyInputObjectSchema).optional(),
  })
  .strict();

export const CouncilListUpdateEnvelopeInputObjectSchema = Schema;
