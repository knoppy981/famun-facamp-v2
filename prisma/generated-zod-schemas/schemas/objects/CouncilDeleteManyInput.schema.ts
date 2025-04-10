import { z } from 'zod';
import { CouncilWhereInputObjectSchema } from './CouncilWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CouncilDeleteManyInput> = z
  .object({
    where: z.lazy(() => CouncilWhereInputObjectSchema),
  })
  .strict();

export const CouncilDeleteManyInputObjectSchema = Schema;
