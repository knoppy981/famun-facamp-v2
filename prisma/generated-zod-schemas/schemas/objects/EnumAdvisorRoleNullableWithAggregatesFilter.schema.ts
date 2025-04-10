import { z } from 'zod';
import { AdvisorRoleSchema } from '../enums/AdvisorRole.schema';
import { NestedEnumAdvisorRoleNullableWithAggregatesFilterObjectSchema } from './NestedEnumAdvisorRoleNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumAdvisorRoleNullableFilterObjectSchema } from './NestedEnumAdvisorRoleNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumAdvisorRoleNullableWithAggregatesFilter> = z
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
        z.lazy(
          () => NestedEnumAdvisorRoleNullableWithAggregatesFilterObjectSchema,
        ),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
    _min: z
      .lazy(() => NestedEnumAdvisorRoleNullableFilterObjectSchema)
      .optional(),
    _max: z
      .lazy(() => NestedEnumAdvisorRoleNullableFilterObjectSchema)
      .optional(),
    isSet: z.boolean().optional(),
  })
  .strict();

export const EnumAdvisorRoleNullableWithAggregatesFilterObjectSchema = Schema;
