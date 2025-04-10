import { z } from 'zod';
import { ParticipantTypeSchema } from '../enums/ParticipantType.schema';
import { NestedEnumParticipantTypeWithAggregatesFilterObjectSchema } from './NestedEnumParticipantTypeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumParticipantTypeFilterObjectSchema } from './NestedEnumParticipantTypeFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumParticipantTypeWithAggregatesFilter> = z
  .object({
    equals: z.lazy(() => ParticipantTypeSchema).optional(),
    in: z
      .union([
        z.lazy(() => ParticipantTypeSchema).array(),
        z.lazy(() => ParticipantTypeSchema),
      ])
      .optional(),
    notIn: z
      .union([
        z.lazy(() => ParticipantTypeSchema).array(),
        z.lazy(() => ParticipantTypeSchema),
      ])
      .optional(),
    not: z
      .union([
        z.lazy(() => ParticipantTypeSchema),
        z.lazy(() => NestedEnumParticipantTypeWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumParticipantTypeFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumParticipantTypeFilterObjectSchema).optional(),
  })
  .strict();

export const EnumParticipantTypeWithAggregatesFilterObjectSchema = Schema;
