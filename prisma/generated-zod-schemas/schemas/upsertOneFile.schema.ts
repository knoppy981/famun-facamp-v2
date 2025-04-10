import { z } from 'zod';
import { FileSelectObjectSchema } from './objects/FileSelect.schema';
import { FileIncludeObjectSchema } from './objects/FileInclude.schema';
import { FileWhereUniqueInputObjectSchema } from './objects/FileWhereUniqueInput.schema';
import { FileCreateInputObjectSchema } from './objects/FileCreateInput.schema';
import { FileUncheckedCreateInputObjectSchema } from './objects/FileUncheckedCreateInput.schema';
import { FileUpdateInputObjectSchema } from './objects/FileUpdateInput.schema';
import { FileUncheckedUpdateInputObjectSchema } from './objects/FileUncheckedUpdateInput.schema';

export const FileUpsertSchema = z.object({
  select: FileSelectObjectSchema.optional(),
  include: FileIncludeObjectSchema.optional(),
  where: FileWhereUniqueInputObjectSchema,
  create: z.union([
    FileCreateInputObjectSchema,
    FileUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    FileUpdateInputObjectSchema,
    FileUncheckedUpdateInputObjectSchema,
  ]),
});
