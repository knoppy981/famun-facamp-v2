import { z } from 'zod';
import { AdvisorRoleSchema } from '../enums/AdvisorRole.schema';
import { NestedEnumAdvisorRoleNullableFilterObjectSchema } from './NestedEnumAdvisorRoleNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumAdvisorRoleNullableFilter> = z
  .object({
    equals: z
      .lazy(() => AdvisorRoleSchema)
      .optional()
      .nullable(),
    in: z
      .union([
        z.lazy(() => AdvisorRoleSchema).array(),
        z.lazy(() => AdvisorRoleSchema),
      ])
      .optional()
      .nullable(),
    notIn: z
      .union([
        z.lazy(() => AdvisorRoleSchema).array(),
        z.lazy(() => AdvisorRoleSchema),
      ])
      .optional()
      .nullable(),
    not: z
      .union([
        z.lazy(() => AdvisorRoleSchema),
        z.lazy(() => NestedEnumAdvisorRoleNullableFilterObjectSchema),
      ])
      .optional()
      .nullable(),
    isSet: z.boolean().optional(),
  })
  .strict();

export const EnumAdvisorRoleNullableFilterObjectSchema = Schema;
