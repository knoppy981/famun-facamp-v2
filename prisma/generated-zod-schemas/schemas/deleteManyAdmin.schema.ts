import { z } from 'zod';
import { AdminWhereInputObjectSchema } from './objects/AdminWhereInput.schema';

export const AdminDeleteManySchema = z.object({
  where: AdminWhereInputObjectSchema.optional(),
});
