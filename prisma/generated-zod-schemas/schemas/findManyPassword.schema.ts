import { z } from 'zod';
import { PasswordSelectObjectSchema } from './objects/PasswordSelect.schema';
import { PasswordIncludeObjectSchema } from './objects/PasswordInclude.schema';
import { PasswordOrderByWithRelationInputObjectSchema } from './objects/PasswordOrderByWithRelationInput.schema';
import { PasswordWhereInputObjectSchema } from './objects/PasswordWhereInput.schema';
import { PasswordWhereUniqueInputObjectSchema } from './objects/PasswordWhereUniqueInput.schema';
import { PasswordScalarFieldEnumSchema } from './enums/PasswordScalarFieldEnum.schema';

export const PasswordFindManySchema = z.object({
  select: z.lazy(() => PasswordSelectObjectSchema.optional()),
  include: z.lazy(() => PasswordIncludeObjectSchema.optional()),
  orderBy: z
    .union([
      PasswordOrderByWithRelationInputObjectSchema,
      PasswordOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: PasswordWhereInputObjectSchema.optional(),
  cursor: PasswordWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(PasswordScalarFieldEnumSchema).optional(),
});
