import { z } from 'zod';
import { DelegationSelectObjectSchema } from './objects/DelegationSelect.schema';
import { DelegationIncludeObjectSchema } from './objects/DelegationInclude.schema';
import { DelegationWhereUniqueInputObjectSchema } from './objects/DelegationWhereUniqueInput.schema';

export const DelegationDeleteOneSchema = z.object({
  select: DelegationSelectObjectSchema.optional(),
  include: DelegationIncludeObjectSchema.optional(),
  where: DelegationWhereUniqueInputObjectSchema,
});
