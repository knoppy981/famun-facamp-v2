import { z } from 'zod';
import { DelegationWhereInputObjectSchema } from './objects/DelegationWhereInput.schema';

export const DelegationDeleteManySchema = z.object({
  where: DelegationWhereInputObjectSchema.optional(),
});
