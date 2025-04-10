import { z } from 'zod';
import { DelegationUpdateManyMutationInputObjectSchema } from './objects/DelegationUpdateManyMutationInput.schema';
import { DelegationWhereInputObjectSchema } from './objects/DelegationWhereInput.schema';

export const DelegationUpdateManySchema = z.object({
  data: DelegationUpdateManyMutationInputObjectSchema,
  where: DelegationWhereInputObjectSchema.optional(),
});
