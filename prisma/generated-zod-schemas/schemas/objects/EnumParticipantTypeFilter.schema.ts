import { z } from 'zod';
import { ParticipantTypeSchema } from '../enums/ParticipantType.schema';
import { NestedEnumParticipantTypeFilterObjectSchema } from './NestedEnumParticipantTypeFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumParticipantTypeFilter> = z
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
        z.lazy(() => NestedEnumParticipantTypeFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const EnumParticipantTypeFilterObjectSchema = Schema;
