import { z } from 'zod';
import { AdminSelectObjectSchema } from './objects/AdminSelect.schema';
import { AdminWhereUniqueInputObjectSchema } from './objects/AdminWhereUniqueInput.schema';
import { AdminCreateInputObjectSchema } from './objects/AdminCreateInput.schema';
import { AdminUncheckedCreateInputObjectSchema } from './objects/AdminUncheckedCreateInput.schema';
import { AdminUpdateInputObjectSchema } from './objects/AdminUpdateInput.schema';
import { AdminUncheckedUpdateInputObjectSchema } from './objects/AdminUncheckedUpdateInput.schema';

export const AdminUpsertSchema = z.object({
  select: AdminSelectObjectSchema.optional(),
  where: AdminWhereUniqueInputObjectSchema,
  create: z.union([
    AdminCreateInputObjectSchema,
    AdminUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    AdminUpdateInputObjectSchema,
    AdminUncheckedUpdateInputObjectSchema,
  ]),
});
