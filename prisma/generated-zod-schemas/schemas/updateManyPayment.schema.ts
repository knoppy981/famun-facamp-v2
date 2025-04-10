import { z } from 'zod';
import { PaymentUpdateManyMutationInputObjectSchema } from './objects/PaymentUpdateManyMutationInput.schema';
import { PaymentWhereInputObjectSchema } from './objects/PaymentWhereInput.schema';

export const PaymentUpdateManySchema = z.object({
  data: PaymentUpdateManyMutationInputObjectSchema,
  where: PaymentWhereInputObjectSchema.optional(),
});
