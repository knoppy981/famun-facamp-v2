import { z } from 'zod';
import { DelegationCreateWithoutPaymentsInputObjectSchema } from './DelegationCreateWithoutPaymentsInput.schema';
import { DelegationUncheckedCreateWithoutPaymentsInputObjectSchema } from './DelegationUncheckedCreateWithoutPaymentsInput.schema';
import { DelegationCreateOrConnectWithoutPaymentsInputObjectSchema } from './DelegationCreateOrConnectWithoutPaymentsInput.schema';
import { DelegationWhereUniqueInputObjectSchema } from './DelegationWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationCreateNestedOneWithoutPaymentsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DelegationCreateWithoutPaymentsInputObjectSchema),
          z.lazy(
            () => DelegationUncheckedCreateWithoutPaymentsInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => DelegationCreateOrConnectWithoutPaymentsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => DelegationWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const DelegationCreateNestedOneWithoutPaymentsInputObjectSchema = Schema;
