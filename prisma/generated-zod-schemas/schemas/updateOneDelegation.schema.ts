import { z } from 'zod';
import { DelegationSelectObjectSchema } from './objects/DelegationSelect.schema';
import { DelegationIncludeObjectSchema } from './objects/DelegationInclude.schema';
import { DelegationUpdateInputObjectSchema } from './objects/DelegationUpdateInput.schema';
import { DelegationUncheckedUpdateInputObjectSchema } from './objects/DelegationUncheckedUpdateInput.schema';
import { DelegationWhereUniqueInputObjectSchema } from './objects/DelegationWhereUniqueInput.schema';

export const DelegationUpdateOneSchema = z.object({
  select: DelegationSelectObjectSchema.optional(),
  include: DelegationIncludeObjectSchema.optional(),
  data: z.union([
    DelegationUpdateInputObjectSchema,
    DelegationUncheckedUpdateInputObjectSchema,
  ]),
  where: DelegationWhereUniqueInputObjectSchema,
});
