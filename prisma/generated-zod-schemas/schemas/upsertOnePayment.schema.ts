import { z } from 'zod';
import { PaymentSelectObjectSchema } from './objects/PaymentSelect.schema';
import { PaymentIncludeObjectSchema } from './objects/PaymentInclude.schema';
import { PaymentWhereUniqueInputObjectSchema } from './objects/PaymentWhereUniqueInput.schema';
import { PaymentCreateInputObjectSchema } from './objects/PaymentCreateInput.schema';
import { PaymentUncheckedCreateInputObjectSchema } from './objects/PaymentUncheckedCreateInput.schema';
import { PaymentUpdateInputObjectSchema } from './objects/PaymentUpdateInput.schema';
import { PaymentUncheckedUpdateInputObjectSchema } from './objects/PaymentUncheckedUpdateInput.schema';

export const PaymentUpsertSchema = z.object({
  select: PaymentSelectObjectSchema.optional(),
  include: PaymentIncludeObjectSchema.optional(),
  where: PaymentWhereUniqueInputObjectSchema,
  create: z.union([
    PaymentCreateInputObjectSchema,
    PaymentUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    PaymentUpdateInputObjectSchema,
    PaymentUncheckedUpdateInputObjectSchema,
  ]),
});
