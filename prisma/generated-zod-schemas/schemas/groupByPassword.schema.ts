import { z } from 'zod';
import { PasswordWhereInputObjectSchema } from './objects/PasswordWhereInput.schema';
import { PasswordOrderByWithAggregationInputObjectSchema } from './objects/PasswordOrderByWithAggregationInput.schema';
import { PasswordScalarWhereWithAggregatesInputObjectSchema } from './objects/PasswordScalarWhereWithAggregatesInput.schema';
import { PasswordScalarFieldEnumSchema } from './enums/PasswordScalarFieldEnum.schema';

export const PasswordGroupBySchema = z.object({
  where: PasswordWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      PasswordOrderByWithAggregationInputObjectSchema,
      PasswordOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: PasswordScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(PasswordScalarFieldEnumSchema),
});
