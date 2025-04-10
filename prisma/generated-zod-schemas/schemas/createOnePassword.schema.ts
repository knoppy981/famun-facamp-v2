import { z } from 'zod';
import { PasswordSelectObjectSchema } from './objects/PasswordSelect.schema';
import { PasswordIncludeObjectSchema } from './objects/PasswordInclude.schema';
import { PasswordCreateInputObjectSchema } from './objects/PasswordCreateInput.schema';
import { PasswordUncheckedCreateInputObjectSchema } from './objects/PasswordUncheckedCreateInput.schema';

export const PasswordCreateOneSchema = z.object({
  select: PasswordSelectObjectSchema.optional(),
  include: PasswordIncludeObjectSchema.optional(),
  data: z.union([
    PasswordCreateInputObjectSchema,
    PasswordUncheckedCreateInputObjectSchema,
  ]),
});
