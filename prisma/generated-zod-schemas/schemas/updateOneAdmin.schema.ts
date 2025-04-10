import { z } from 'zod';
import { AdminSelectObjectSchema } from './objects/AdminSelect.schema';
import { AdminUpdateInputObjectSchema } from './objects/AdminUpdateInput.schema';
import { AdminUncheckedUpdateInputObjectSchema } from './objects/AdminUncheckedUpdateInput.schema';
import { AdminWhereUniqueInputObjectSchema } from './objects/AdminWhereUniqueInput.schema';

export const AdminUpdateOneSchema = z.object({
  select: AdminSelectObjectSchema.optional(),
  data: z.union([
    AdminUpdateInputObjectSchema,
    AdminUncheckedUpdateInputObjectSchema,
  ]),
  where: AdminWhereUniqueInputObjectSchema,
});
