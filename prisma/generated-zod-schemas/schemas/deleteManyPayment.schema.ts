import { z } from 'zod';
import { PaymentWhereInputObjectSchema } from './objects/PaymentWhereInput.schema';

export const PaymentDeleteManySchema = z.object({
  where: PaymentWhereInputObjectSchema.optional(),
});
