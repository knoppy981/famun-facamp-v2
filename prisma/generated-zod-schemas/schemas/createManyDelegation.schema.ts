import { z } from 'zod';
import { DelegationCreateManyInputObjectSchema } from './objects/DelegationCreateManyInput.schema';

export const DelegationCreateManySchema = z.object({
  data: z.union([
    DelegationCreateManyInputObjectSchema,
    z.array(DelegationCreateManyInputObjectSchema),
  ]),
});
