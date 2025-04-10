import { z } from 'zod';
import { PasswordWhereInputObjectSchema } from './objects/PasswordWhereInput.schema';

export const PasswordDeleteManySchema = z.object({
  where: PasswordWhereInputObjectSchema.optional(),
});
