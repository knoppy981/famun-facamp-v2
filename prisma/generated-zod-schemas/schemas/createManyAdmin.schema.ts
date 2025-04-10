import { z } from 'zod';
import { AdminCreateManyInputObjectSchema } from './objects/AdminCreateManyInput.schema';

export const AdminCreateManySchema = z.object({
  data: z.union([
    AdminCreateManyInputObjectSchema,
    z.array(AdminCreateManyInputObjectSchema),
  ]),
});
