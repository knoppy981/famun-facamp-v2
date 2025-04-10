import { z } from 'zod';
import { AdvisorRoleSchema } from '../enums/AdvisorRole.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NullableEnumAdvisorRoleFieldUpdateOperationsInput> =
  z
    .object({
      set: z
        .lazy(() => AdvisorRoleSchema)
        .optional()
        .nullable(),
      unset: z.boolean().optional(),
    })
    .strict();

export const NullableEnumAdvisorRoleFieldUpdateOperationsInputObjectSchema =
  Schema;
