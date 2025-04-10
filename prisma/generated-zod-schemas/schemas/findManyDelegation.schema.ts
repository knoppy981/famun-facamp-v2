import { z } from 'zod';
import { DelegationSelectObjectSchema } from './objects/DelegationSelect.schema';
import { DelegationIncludeObjectSchema } from './objects/DelegationInclude.schema';
import { DelegationOrderByWithRelationInputObjectSchema } from './objects/DelegationOrderByWithRelationInput.schema';
import { DelegationWhereInputObjectSchema } from './objects/DelegationWhereInput.schema';
import { DelegationWhereUniqueInputObjectSchema } from './objects/DelegationWhereUniqueInput.schema';
import { DelegationScalarFieldEnumSchema } from './enums/DelegationScalarFieldEnum.schema';

export const DelegationFindManySchema = z.object({
  select: z.lazy(() => DelegationSelectObjectSchema.optional()),
  include: z.lazy(() => DelegationIncludeObjectSchema.optional()),
  orderBy: z
    .union([
      DelegationOrderByWithRelationInputObjectSchema,
      DelegationOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: DelegationWhereInputObjectSchema.optional(),
  cursor: DelegationWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(DelegationScalarFieldEnumSchema).optional(),
});
