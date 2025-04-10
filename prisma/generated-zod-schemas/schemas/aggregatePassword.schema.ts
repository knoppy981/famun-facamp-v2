import { z } from 'zod';
import { PasswordOrderByWithRelationInputObjectSchema } from './objects/PasswordOrderByWithRelationInput.schema';
import { PasswordWhereInputObjectSchema } from './objects/PasswordWhereInput.schema';
import { PasswordWhereUniqueInputObjectSchema } from './objects/PasswordWhereUniqueInput.schema';
import { PasswordCountAggregateInputObjectSchema } from './objects/PasswordCountAggregateInput.schema';
import { PasswordMinAggregateInputObjectSchema } from './objects/PasswordMinAggregateInput.schema';
import { PasswordMaxAggregateInputObjectSchema } from './objects/PasswordMaxAggregateInput.schema';

export const PasswordAggregateSchema = z.object({
  orderBy: z
    .union([
      PasswordOrderByWithRelationInputObjectSchema,
      PasswordOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: PasswordWhereInputObjectSchema.optional(),
  cursor: PasswordWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), PasswordCountAggregateInputObjectSchema])
    .optional(),
  _min: PasswordMinAggregateInputObjectSchema.optional(),
  _max: PasswordMaxAggregateInputObjectSchema.optional(),
});
