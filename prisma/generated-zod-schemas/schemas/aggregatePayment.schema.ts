import { z } from 'zod';
import { PaymentOrderByWithRelationInputObjectSchema } from './objects/PaymentOrderByWithRelationInput.schema';
import { PaymentWhereInputObjectSchema } from './objects/PaymentWhereInput.schema';
import { PaymentWhereUniqueInputObjectSchema } from './objects/PaymentWhereUniqueInput.schema';
import { PaymentCountAggregateInputObjectSchema } from './objects/PaymentCountAggregateInput.schema';
import { PaymentMinAggregateInputObjectSchema } from './objects/PaymentMinAggregateInput.schema';
import { PaymentMaxAggregateInputObjectSchema } from './objects/PaymentMaxAggregateInput.schema';
import { PaymentAvgAggregateInputObjectSchema } from './objects/PaymentAvgAggregateInput.schema';
import { PaymentSumAggregateInputObjectSchema } from './objects/PaymentSumAggregateInput.schema';

export const PaymentAggregateSchema = z.object({
  orderBy: z
    .union([
      PaymentOrderByWithRelationInputObjectSchema,
      PaymentOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: PaymentWhereInputObjectSchema.optional(),
  cursor: PaymentWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), PaymentCountAggregateInputObjectSchema])
    .optional(),
  _min: PaymentMinAggregateInputObjectSchema.optional(),
  _max: PaymentMaxAggregateInputObjectSchema.optional(),
  _avg: PaymentAvgAggregateInputObjectSchema.optional(),
  _sum: PaymentSumAggregateInputObjectSchema.optional(),
});
