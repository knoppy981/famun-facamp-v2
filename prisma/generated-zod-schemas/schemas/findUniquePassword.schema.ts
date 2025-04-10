import { z } from 'zod';
import { PasswordSelectObjectSchema } from './objects/PasswordSelect.schema';
import { PasswordIncludeObjectSchema } from './objects/PasswordInclude.schema';
import { PasswordWhereUniqueInputObjectSchema } from './objects/PasswordWhereUniqueInput.schema';

export const PasswordFindUniqueSchema = z.object({
  select: PasswordSelectObjectSchema.optional(),
  include: PasswordIncludeObjectSchema.optional(),
  where: PasswordWhereUniqueInputObjectSchema,
});
