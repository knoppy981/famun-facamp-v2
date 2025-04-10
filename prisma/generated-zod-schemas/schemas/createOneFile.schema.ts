import { z } from 'zod';
import { FileSelectObjectSchema } from './objects/FileSelect.schema';
import { FileIncludeObjectSchema } from './objects/FileInclude.schema';
import { FileCreateInputObjectSchema } from './objects/FileCreateInput.schema';
import { FileUncheckedCreateInputObjectSchema } from './objects/FileUncheckedCreateInput.schema';

export const FileCreateOneSchema = z.object({
  select: FileSelectObjectSchema.optional(),
  include: FileIncludeObjectSchema.optional(),
  data: z.union([
    FileCreateInputObjectSchema,
    FileUncheckedCreateInputObjectSchema,
  ]),
});
