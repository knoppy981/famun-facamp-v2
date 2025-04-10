import { z } from 'zod';
import { AdminUpdateManyMutationInputObjectSchema } from './objects/AdminUpdateManyMutationInput.schema';
import { AdminWhereInputObjectSchema } from './objects/AdminWhereInput.schema';

export const AdminUpdateManySchema = z.object({
  data: AdminUpdateManyMutationInputObjectSchema,
  where: AdminWhereInputObjectSchema.optional(),
});
