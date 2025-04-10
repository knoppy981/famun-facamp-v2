import { z } from 'zod';
import { PaymentSelectObjectSchema } from './objects/PaymentSelect.schema';
import { PaymentIncludeObjectSchema } from './objects/PaymentInclude.schema';
import { PaymentWhereUniqueInputObjectSchema } from './objects/PaymentWhereUniqueInput.schema';

export const PaymentFindUniqueSchema = z.object({
  select: PaymentSelectObjectSchema.optional(),
  include: PaymentIncludeObjectSchema.optional(),
  where: PaymentWhereUniqueInputObjectSchema,
});
