import { z } from 'zod';
import { AdminOrderByWithRelationInputObjectSchema } from './objects/AdminOrderByWithRelationInput.schema';
import { AdminWhereInputObjectSchema } from './objects/AdminWhereInput.schema';
import { AdminWhereUniqueInputObjectSchema } from './objects/AdminWhereUniqueInput.schema';
import { AdminCountAggregateInputObjectSchema } from './objects/AdminCountAggregateInput.schema';
import { AdminMinAggregateInputObjectSchema } from './objects/AdminMinAggregateInput.schema';
import { AdminMaxAggregateInputObjectSchema } from './objects/AdminMaxAggregateInput.schema';

export const AdminAggregateSchema = z.object({
  orderBy: z
    .union([
      AdminOrderByWithRelationInputObjectSchema,
      AdminOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: AdminWhereInputObjectSchema.optional(),
  cursor: AdminWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), AdminCountAggregateInputObjectSchema])
    .optional(),
  _min: AdminMinAggregateInputObjectSchema.optional(),
  _max: AdminMaxAggregateInputObjectSchema.optional(),
});
