import { z } from 'zod';
import { DelegationCreateWithoutUsersInputObjectSchema } from './DelegationCreateWithoutUsersInput.schema';
import { DelegationUncheckedCreateWithoutUsersInputObjectSchema } from './DelegationUncheckedCreateWithoutUsersInput.schema';
import { DelegationCreateOrConnectWithoutUsersInputObjectSchema } from './DelegationCreateOrConnectWithoutUsersInput.schema';
import { DelegationUpsertWithoutUsersInputObjectSchema } from './DelegationUpsertWithoutUsersInput.schema';
import { DelegationWhereUniqueInputObjectSchema } from './DelegationWhereUniqueInput.schema';
import { DelegationUpdateWithoutUsersInputObjectSchema } from './DelegationUpdateWithoutUsersInput.schema';
import { DelegationUncheckedUpdateWithoutUsersInputObjectSchema } from './DelegationUncheckedUpdateWithoutUsersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationUpdateOneRequiredWithoutUsersNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DelegationCreateWithoutUsersInputObjectSchema),
          z.lazy(() => DelegationUncheckedCreateWithoutUsersInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => DelegationCreateOrConnectWithoutUsersInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => DelegationUpsertWithoutUsersInputObjectSchema)
        .optional(),
      connect: z.lazy(() => DelegationWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => DelegationUpdateWithoutUsersInputObjectSchema),
          z.lazy(() => DelegationUncheckedUpdateWithoutUsersInputObjectSchema),
        ])
        .optional(),
    })
    .strict();

export const DelegationUpdateOneRequiredWithoutUsersNestedInputObjectSchema =
  Schema;
