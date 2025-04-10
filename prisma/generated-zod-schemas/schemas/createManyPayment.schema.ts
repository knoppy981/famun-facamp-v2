import { z } from 'zod';
import { PaymentCreateManyInputObjectSchema } from './objects/PaymentCreateManyInput.schema';

export const PaymentCreateManySchema = z.object({
  data: z.union([
    PaymentCreateManyInputObjectSchema,
    z.array(PaymentCreateManyInputObjectSchema),
  ]),
});
