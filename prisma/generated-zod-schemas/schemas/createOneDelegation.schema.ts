import { z } from 'zod';
import { DelegationSelectObjectSchema } from './objects/DelegationSelect.schema';
import { DelegationIncludeObjectSchema } from './objects/DelegationInclude.schema';
import { DelegationCreateInputObjectSchema } from './objects/DelegationCreateInput.schema';
import { DelegationUncheckedCreateInputObjectSchema } from './objects/DelegationUncheckedCreateInput.schema';

export const DelegationCreateOneSchema = z.object({
  select: DelegationSelectObjectSchema.optional(),
  include: DelegationIncludeObjectSchema.optional(),
  data: z.union([
    DelegationCreateInputObjectSchema,
    DelegationUncheckedCreateInputObjectSchema,
  ]),
});
