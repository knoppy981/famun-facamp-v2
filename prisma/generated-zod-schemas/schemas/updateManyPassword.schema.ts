import { z } from 'zod';
import { PasswordUpdateManyMutationInputObjectSchema } from './objects/PasswordUpdateManyMutationInput.schema';
import { PasswordWhereInputObjectSchema } from './objects/PasswordWhereInput.schema';

export const PasswordUpdateManySchema = z.object({
  data: PasswordUpdateManyMutationInputObjectSchema,
  where: PasswordWhereInputObjectSchema.optional(),
});
