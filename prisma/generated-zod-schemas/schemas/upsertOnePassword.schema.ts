import { z } from 'zod';
import { PasswordSelectObjectSchema } from './objects/PasswordSelect.schema';
import { PasswordIncludeObjectSchema } from './objects/PasswordInclude.schema';
import { PasswordWhereUniqueInputObjectSchema } from './objects/PasswordWhereUniqueInput.schema';
import { PasswordCreateInputObjectSchema } from './objects/PasswordCreateInput.schema';
import { PasswordUncheckedCreateInputObjectSchema } from './objects/PasswordUncheckedCreateInput.schema';
import { PasswordUpdateInputObjectSchema } from './objects/PasswordUpdateInput.schema';
import { PasswordUncheckedUpdateInputObjectSchema } from './objects/PasswordUncheckedUpdateInput.schema';

export const PasswordUpsertSchema = z.object({
  select: PasswordSelectObjectSchema.optional(),
  include: PasswordIncludeObjectSchema.optional(),
  where: PasswordWhereUniqueInputObjectSchema,
  create: z.union([
    PasswordCreateInputObjectSchema,
    PasswordUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    PasswordUpdateInputObjectSchema,
    PasswordUncheckedUpdateInputObjectSchema,
  ]),
});
