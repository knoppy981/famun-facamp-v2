import { z } from 'zod';
import { DelegationSelectObjectSchema } from './objects/DelegationSelect.schema';
import { DelegationIncludeObjectSchema } from './objects/DelegationInclude.schema';
import { DelegationWhereUniqueInputObjectSchema } from './objects/DelegationWhereUniqueInput.schema';
import { DelegationCreateInputObjectSchema } from './objects/DelegationCreateInput.schema';
import { DelegationUncheckedCreateInputObjectSchema } from './objects/DelegationUncheckedCreateInput.schema';
import { DelegationUpdateInputObjectSchema } from './objects/DelegationUpdateInput.schema';
import { DelegationUncheckedUpdateInputObjectSchema } from './objects/DelegationUncheckedUpdateInput.schema';

export const DelegationUpsertSchema = z.object({
  select: DelegationSelectObjectSchema.optional(),
  include: DelegationIncludeObjectSchema.optional(),
  where: DelegationWhereUniqueInputObjectSchema,
  create: z.union([
    DelegationCreateInputObjectSchema,
    DelegationUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    DelegationUpdateInputObjectSchema,
    DelegationUncheckedUpdateInputObjectSchema,
  ]),
});
