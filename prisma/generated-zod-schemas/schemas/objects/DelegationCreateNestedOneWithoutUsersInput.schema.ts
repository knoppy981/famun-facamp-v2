import { z } from 'zod';
import { DelegationCreateWithoutUsersInputObjectSchema } from './DelegationCreateWithoutUsersInput.schema';
import { DelegationUncheckedCreateWithoutUsersInputObjectSchema } from './DelegationUncheckedCreateWithoutUsersInput.schema';
import { DelegationCreateOrConnectWithoutUsersInputObjectSchema } from './DelegationCreateOrConnectWithoutUsersInput.schema';
import { DelegationWhereUniqueInputObjectSchema } from './DelegationWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationCreateNestedOneWithoutUsersInput> = z
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
    connect: z.lazy(() => DelegationWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const DelegationCreateNestedOneWithoutUsersInputObjectSchema = Schema;
