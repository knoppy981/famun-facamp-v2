import { z } from 'zod';
import { ParticipantTypeSchema } from '../enums/ParticipantType.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumParticipantTypeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => ParticipantTypeSchema).optional(),
    })
    .strict();

export const EnumParticipantTypeFieldUpdateOperationsInputObjectSchema = Schema;
