import { z } from 'zod';
import { PaymentScalarWhereInputObjectSchema } from './PaymentScalarWhereInput.schema';
import { PaymentUpdateManyMutationInputObjectSchema } from './PaymentUpdateManyMutationInput.schema';
import { PaymentUncheckedUpdateManyWithoutPaymentsInputObjectSchema } from './PaymentUncheckedUpdateManyWithoutPaymentsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PaymentUpdateManyWithWhereWithoutDelegationInput> =
  z
    .object({
      where: z.lazy(() => PaymentScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => PaymentUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => PaymentUncheckedUpdateManyWithoutPaymentsInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const PaymentUpdateManyWithWhereWithoutDelegationInputObjectSchema =
  Schema;
