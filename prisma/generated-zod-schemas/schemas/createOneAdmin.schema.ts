import { z } from 'zod';
import { AdminSelectObjectSchema } from './objects/AdminSelect.schema';
import { AdminCreateInputObjectSchema } from './objects/AdminCreateInput.schema';
import { AdminUncheckedCreateInputObjectSchema } from './objects/AdminUncheckedCreateInput.schema';

export const AdminCreateOneSchema = z.object({
  select: AdminSelectObjectSchema.optional(),
  data: z.union([
    AdminCreateInputObjectSchema,
    AdminUncheckedCreateInputObjectSchema,
  ]),
});
