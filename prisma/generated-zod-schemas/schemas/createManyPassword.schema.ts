import { z } from 'zod';
import { PasswordCreateManyInputObjectSchema } from './objects/PasswordCreateManyInput.schema';

export const PasswordCreateManySchema = z.object({
  data: z.union([
    PasswordCreateManyInputObjectSchema,
    z.array(PasswordCreateManyInputObjectSchema),
  ]),
});
