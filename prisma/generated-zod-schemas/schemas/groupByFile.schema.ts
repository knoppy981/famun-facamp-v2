import { z } from 'zod';
import { FileWhereInputObjectSchema } from './objects/FileWhereInput.schema';
import { FileOrderByWithAggregationInputObjectSchema } from './objects/FileOrderByWithAggregationInput.schema';
import { FileScalarWhereWithAggregatesInputObjectSchema } from './objects/FileScalarWhereWithAggregatesInput.schema';
import { FileScalarFieldEnumSchema } from './enums/FileScalarFieldEnum.schema';

export const FileGroupBySchema = z.object({
  where: FileWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      FileOrderByWithAggregationInputObjectSchema,
      FileOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: FileScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(FileScalarFieldEnumSchema),
});
