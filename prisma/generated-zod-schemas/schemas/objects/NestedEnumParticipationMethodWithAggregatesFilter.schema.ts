import { z } from 'zod';
import { ParticipationMethodSchema } from '../enums/ParticipationMethod.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumParticipationMethodFilterObjectSchema } from './NestedEnumParticipationMethodFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumParticipationMethodWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => ParticipationMethodSchema).optional(),
      in: z
        .union([
          z.lazy(() => ParticipationMethodSchema).array(),
          z.lazy(() => ParticipationMethodSchema),
        ])
        .optional(),
      notIn: z
        .union([
          z.lazy(() => ParticipationMethodSchema).array(),
          z.lazy(() => ParticipationMethodSchema),
        ])
        .optional(),
      not: z
        .union([
          z.lazy(() => ParticipationMethodSchema),
          z.lazy(
            () => NestedEnumParticipationMethodWithAggregatesFilterObjectSchema,
          ),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
      _min: z
        .lazy(() => NestedEnumParticipationMethodFilterObjectSchema)
        .optional(),
      _max: z
        .lazy(() => NestedEnumParticipationMethodFilterObjectSchema)
        .optional(),
    })
    .strict();

export const NestedEnumParticipationMethodWithAggregatesFilterObjectSchema =
  Schema;
