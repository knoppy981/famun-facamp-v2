import { z } from 'zod';
import { PaymentSelectObjectSchema } from './objects/PaymentSelect.schema';
import { PaymentIncludeObjectSchema } from './objects/PaymentInclude.schema';
import { PaymentUpdateInputObjectSchema } from './objects/PaymentUpdateInput.schema';
import { PaymentUncheckedUpdateInputObjectSchema } from './objects/PaymentUncheckedUpdateInput.schema';
import { PaymentWhereUniqueInputObjectSchema } from './objects/PaymentWhereUniqueInput.schema';

export const PaymentUpdateOneSchema = z.object({
  select: PaymentSelectObjectSchema.optional(),
  include: PaymentIncludeObjectSchema.optional(),
  data: z.union([
    PaymentUpdateInputObjectSchema,
    PaymentUncheckedUpdateInputObjectSchema,
  ]),
  where: PaymentWhereUniqueInputObjectSchema,
});
