import { z } from 'zod';
import { AdminSelectObjectSchema } from './objects/AdminSelect.schema';
import { AdminOrderByWithRelationInputObjectSchema } from './objects/AdminOrderByWithRelationInput.schema';
import { AdminWhereInputObjectSchema } from './objects/AdminWhereInput.schema';
import { AdminWhereUniqueInputObjectSchema } from './objects/AdminWhereUniqueInput.schema';
import { AdminScalarFieldEnumSchema } from './enums/AdminScalarFieldEnum.schema';

export const AdminFindManySchema = z.object({
  select: z.lazy(() => AdminSelectObjectSchema.optional()),
  orderBy: z
    .union([
      AdminOrderByWithRelationInputObjectSchema,
      AdminOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: AdminWhereInputObjectSchema.optional(),
  cursor: AdminWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(AdminScalarFieldEnumSchema).optional(),
});
