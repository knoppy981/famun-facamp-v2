import { z } from 'zod';
import { FileWhereInputObjectSchema } from './objects/FileWhereInput.schema';

export const FileDeleteManySchema = z.object({
  where: FileWhereInputObjectSchema.optional(),
});
