import { z } from 'zod';
import { DelegationWhereInputObjectSchema } from './objects/DelegationWhereInput.schema';
import { DelegationOrderByWithAggregationInputObjectSchema } from './objects/DelegationOrderByWithAggregationInput.schema';
import { DelegationScalarWhereWithAggregatesInputObjectSchema } from './objects/DelegationScalarWhereWithAggregatesInput.schema';
import { DelegationScalarFieldEnumSchema } from './enums/DelegationScalarFieldEnum.schema';

export const DelegationGroupBySchema = z.object({
  where: DelegationWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      DelegationOrderByWithAggregationInputObjectSchema,
      DelegationOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: DelegationScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(DelegationScalarFieldEnumSchema),
});
