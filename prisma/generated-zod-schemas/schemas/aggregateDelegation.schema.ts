import { z } from 'zod';
import { DelegationOrderByWithRelationInputObjectSchema } from './objects/DelegationOrderByWithRelationInput.schema';
import { DelegationWhereInputObjectSchema } from './objects/DelegationWhereInput.schema';
import { DelegationWhereUniqueInputObjectSchema } from './objects/DelegationWhereUniqueInput.schema';
import { DelegationCountAggregateInputObjectSchema } from './objects/DelegationCountAggregateInput.schema';
import { DelegationMinAggregateInputObjectSchema } from './objects/DelegationMinAggregateInput.schema';
import { DelegationMaxAggregateInputObjectSchema } from './objects/DelegationMaxAggregateInput.schema';
import { DelegationAvgAggregateInputObjectSchema } from './objects/DelegationAvgAggregateInput.schema';
import { DelegationSumAggregateInputObjectSchema } from './objects/DelegationSumAggregateInput.schema';

export const DelegationAggregateSchema = z.object({
  orderBy: z
    .union([
      DelegationOrderByWithRelationInputObjectSchema,
      DelegationOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: DelegationWhereInputObjectSchema.optional(),
  cursor: DelegationWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), DelegationCountAggregateInputObjectSchema])
    .optional(),
  _min: DelegationMinAggregateInputObjectSchema.optional(),
  _max: DelegationMaxAggregateInputObjectSchema.optional(),
  _avg: DelegationAvgAggregateInputObjectSchema.optional(),
  _sum: DelegationSumAggregateInputObjectSchema.optional(),
});
