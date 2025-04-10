import { z } from 'zod';
import { CouncilWhereInputObjectSchema } from './CouncilWhereInput.schema';
import { CouncilUpdateInputObjectSchema } from './CouncilUpdateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CouncilUpdateManyInput> = z
  .object({
    where: z.lazy(() => CouncilWhereInputObjectSchema),
    data: z.lazy(() => CouncilUpdateInputObjectSchema),
  })
  .strict();

export const CouncilUpdateManyInputObjectSchema = Schema;
