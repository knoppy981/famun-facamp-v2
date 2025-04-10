import { z } from 'zod';
import { PasswordSelectObjectSchema } from './objects/PasswordSelect.schema';
import { PasswordIncludeObjectSchema } from './objects/PasswordInclude.schema';
import { PasswordUpdateInputObjectSchema } from './objects/PasswordUpdateInput.schema';
import { PasswordUncheckedUpdateInputObjectSchema } from './objects/PasswordUncheckedUpdateInput.schema';
import { PasswordWhereUniqueInputObjectSchema } from './objects/PasswordWhereUniqueInput.schema';

export const PasswordUpdateOneSchema = z.object({
  select: PasswordSelectObjectSchema.optional(),
  include: PasswordIncludeObjectSchema.optional(),
  data: z.union([
    PasswordUpdateInputObjectSchema,
    PasswordUncheckedUpdateInputObjectSchema,
  ]),
  where: PasswordWhereUniqueInputObjectSchema,
});
