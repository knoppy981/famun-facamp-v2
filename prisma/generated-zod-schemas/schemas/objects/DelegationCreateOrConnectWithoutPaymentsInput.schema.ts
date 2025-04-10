import { z } from 'zod';
import { DelegationWhereUniqueInputObjectSchema } from './DelegationWhereUniqueInput.schema';
import { DelegationCreateWithoutPaymentsInputObjectSchema } from './DelegationCreateWithoutPaymentsInput.schema';
import { DelegationUncheckedCreateWithoutPaymentsInputObjectSchema } from './DelegationUncheckedCreateWithoutPaymentsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationCreateOrConnectWithoutPaymentsInput> =
  z
    .object({
      where: z.lazy(() => DelegationWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => DelegationCreateWithoutPaymentsInputObjectSchema),
        z.lazy(() => DelegationUncheckedCreateWithoutPaymentsInputObjectSchema),
      ]),
    })
    .strict();

export const DelegationCreateOrConnectWithoutPaymentsInputObjectSchema = Schema;
