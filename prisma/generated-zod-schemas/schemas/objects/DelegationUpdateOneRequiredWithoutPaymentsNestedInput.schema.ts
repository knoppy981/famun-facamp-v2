import { z } from 'zod';
import { DelegationCreateWithoutPaymentsInputObjectSchema } from './DelegationCreateWithoutPaymentsInput.schema';
import { DelegationUncheckedCreateWithoutPaymentsInputObjectSchema } from './DelegationUncheckedCreateWithoutPaymentsInput.schema';
import { DelegationCreateOrConnectWithoutPaymentsInputObjectSchema } from './DelegationCreateOrConnectWithoutPaymentsInput.schema';
import { DelegationUpsertWithoutPaymentsInputObjectSchema } from './DelegationUpsertWithoutPaymentsInput.schema';
import { DelegationWhereUniqueInputObjectSchema } from './DelegationWhereUniqueInput.schema';
import { DelegationUpdateWithoutPaymentsInputObjectSchema } from './DelegationUpdateWithoutPaymentsInput.schema';
import { DelegationUncheckedUpdateWithoutPaymentsInputObjectSchema } from './DelegationUncheckedUpdateWithoutPaymentsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationUpdateOneRequiredWithoutPaymentsNestedInput> =
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
      upsert: z
        .lazy(() => DelegationUpsertWithoutPaymentsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => DelegationWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => DelegationUpdateWithoutPaymentsInputObjectSchema),
          z.lazy(
            () => DelegationUncheckedUpdateWithoutPaymentsInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const DelegationUpdateOneRequiredWithoutPaymentsNestedInputObjectSchema =
  Schema;
