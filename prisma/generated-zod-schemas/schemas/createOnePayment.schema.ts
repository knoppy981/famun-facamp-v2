import { z } from 'zod';
import { PaymentSelectObjectSchema } from './objects/PaymentSelect.schema';
import { PaymentIncludeObjectSchema } from './objects/PaymentInclude.schema';
import { PaymentCreateInputObjectSchema } from './objects/PaymentCreateInput.schema';
import { PaymentUncheckedCreateInputObjectSchema } from './objects/PaymentUncheckedCreateInput.schema';

export const PaymentCreateOneSchema = z.object({
  select: PaymentSelectObjectSchema.optional(),
  include: PaymentIncludeObjectSchema.optional(),
  data: z.union([
    PaymentCreateInputObjectSchema,
    PaymentUncheckedCreateInputObjectSchema,
  ]),
});
