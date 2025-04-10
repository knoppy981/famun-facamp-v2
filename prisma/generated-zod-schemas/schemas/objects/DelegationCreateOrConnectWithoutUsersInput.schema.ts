import { z } from 'zod';
import { DelegationWhereUniqueInputObjectSchema } from './DelegationWhereUniqueInput.schema';
import { DelegationCreateWithoutUsersInputObjectSchema } from './DelegationCreateWithoutUsersInput.schema';
import { DelegationUncheckedCreateWithoutUsersInputObjectSchema } from './DelegationUncheckedCreateWithoutUsersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationCreateOrConnectWithoutUsersInput> = z
  .object({
    where: z.lazy(() => DelegationWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => DelegationCreateWithoutUsersInputObjectSchema),
      z.lazy(() => DelegationUncheckedCreateWithoutUsersInputObjectSchema),
    ]),
  })
  .strict();

export const DelegationCreateOrConnectWithoutUsersInputObjectSchema = Schema;
