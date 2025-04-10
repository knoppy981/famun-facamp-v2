import { z } from 'zod';
import { FileSelectObjectSchema } from './objects/FileSelect.schema';
import { FileIncludeObjectSchema } from './objects/FileInclude.schema';
import { FileUpdateInputObjectSchema } from './objects/FileUpdateInput.schema';
import { FileUncheckedUpdateInputObjectSchema } from './objects/FileUncheckedUpdateInput.schema';
import { FileWhereUniqueInputObjectSchema } from './objects/FileWhereUniqueInput.schema';

export const FileUpdateOneSchema = z.object({
  select: FileSelectObjectSchema.optional(),
  include: FileIncludeObjectSchema.optional(),
  data: z.union([
    FileUpdateInputObjectSchema,
    FileUncheckedUpdateInputObjectSchema,
  ]),
  where: FileWhereUniqueInputObjectSchema,
});
