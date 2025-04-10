import { z } from 'zod';
import { DelegationUpdateWithoutPaymentsInputObjectSchema } from './DelegationUpdateWithoutPaymentsInput.schema';
import { DelegationUncheckedUpdateWithoutPaymentsInputObjectSchema } from './DelegationUncheckedUpdateWithoutPaymentsInput.schema';
import { DelegationCreateWithoutPaymentsInputObjectSchema } from './DelegationCreateWithoutPaymentsInput.schema';
import { DelegationUncheckedCreateWithoutPaymentsInputObjectSchema } from './DelegationUncheckedCreateWithoutPaymentsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationUpsertWithoutPaymentsInput> = z
  .object({
    update: z.union([
      z.lazy(() => DelegationUpdateWithoutPaymentsInputObjectSchema),
      z.lazy(() => DelegationUncheckedUpdateWithoutPaymentsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => DelegationCreateWithoutPaymentsInputObjectSchema),
      z.lazy(() => DelegationUncheckedCreateWithoutPaymentsInputObjectSchema),
    ]),
  })
  .strict();

export const DelegationUpsertWithoutPaymentsInputObjectSchema = Schema;
