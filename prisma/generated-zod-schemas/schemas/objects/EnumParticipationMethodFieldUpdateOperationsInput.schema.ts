import { z } from 'zod';
import { ParticipationMethodSchema } from '../enums/ParticipationMethod.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumParticipationMethodFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => ParticipationMethodSchema).optional(),
    })
    .strict();

export const EnumParticipationMethodFieldUpdateOperationsInputObjectSchema =
  Schema;
