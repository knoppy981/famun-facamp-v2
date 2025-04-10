import { z } from 'zod';
import { FileOrderByWithRelationInputObjectSchema } from './objects/FileOrderByWithRelationInput.schema';
import { FileWhereInputObjectSchema } from './objects/FileWhereInput.schema';
import { FileWhereUniqueInputObjectSchema } from './objects/FileWhereUniqueInput.schema';
import { FileCountAggregateInputObjectSchema } from './objects/FileCountAggregateInput.schema';
import { FileMinAggregateInputObjectSchema } from './objects/FileMinAggregateInput.schema';
import { FileMaxAggregateInputObjectSchema } from './objects/FileMaxAggregateInput.schema';
import { FileAvgAggregateInputObjectSchema } from './objects/FileAvgAggregateInput.schema';
import { FileSumAggregateInputObjectSchema } from './objects/FileSumAggregateInput.schema';

export const FileAggregateSchema = z.object({
  orderBy: z
    .union([
      FileOrderByWithRelationInputObjectSchema,
      FileOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: FileWhereInputObjectSchema.optional(),
  cursor: FileWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), FileCountAggregateInputObjectSchema])
    .optional(),
  _min: FileMinAggregateInputObjectSchema.optional(),
  _max: FileMaxAggregateInputObjectSchema.optional(),
  _avg: FileAvgAggregateInputObjectSchema.optional(),
  _sum: FileSumAggregateInputObjectSchema.optional(),
});
