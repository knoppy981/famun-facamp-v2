import { z } from 'zod';
import { FileSelectObjectSchema } from './objects/FileSelect.schema';
import { FileIncludeObjectSchema } from './objects/FileInclude.schema';
import { FileWhereUniqueInputObjectSchema } from './objects/FileWhereUniqueInput.schema';

export const FileFindUniqueSchema = z.object({
  select: FileSelectObjectSchema.optional(),
  include: FileIncludeObjectSchema.optional(),
  where: FileWhereUniqueInputObjectSchema,
});
