import { z } from 'zod';
import { AdminSelectObjectSchema } from './objects/AdminSelect.schema';
import { AdminWhereUniqueInputObjectSchema } from './objects/AdminWhereUniqueInput.schema';

export const AdminFindUniqueSchema = z.object({
  select: AdminSelectObjectSchema.optional(),
  where: AdminWhereUniqueInputObjectSchema,
});
