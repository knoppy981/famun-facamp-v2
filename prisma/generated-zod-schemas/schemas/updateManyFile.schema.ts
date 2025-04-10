import { z } from 'zod';
import { FileUpdateManyMutationInputObjectSchema } from './objects/FileUpdateManyMutationInput.schema';
import { FileWhereInputObjectSchema } from './objects/FileWhereInput.schema';

export const FileUpdateManySchema = z.object({
  data: FileUpdateManyMutationInputObjectSchema,
  where: FileWhereInputObjectSchema.optional(),
});
