import { z } from 'zod';
import { ParticipationMethodSchema } from '../enums/ParticipationMethod.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumParticipationMethodFilter> = z
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
        z.lazy(() => NestedEnumParticipationMethodFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const NestedEnumParticipationMethodFilterObjectSchema = Schema;
