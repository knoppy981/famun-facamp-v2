import { z } from 'zod';
import { PaymentWhereInputObjectSchema } from './objects/PaymentWhereInput.schema';
import { PaymentOrderByWithAggregationInputObjectSchema } from './objects/PaymentOrderByWithAggregationInput.schema';
import { PaymentScalarWhereWithAggregatesInputObjectSchema } from './objects/PaymentScalarWhereWithAggregatesInput.schema';
import { PaymentScalarFieldEnumSchema } from './enums/PaymentScalarFieldEnum.schema';

export const PaymentGroupBySchema = z.object({
  where: PaymentWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      PaymentOrderByWithAggregationInputObjectSchema,
      PaymentOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: PaymentScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(PaymentScalarFieldEnumSchema),
});
