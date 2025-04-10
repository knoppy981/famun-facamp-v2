import { z } from 'zod';
import { DelegationUpdateWithoutUsersInputObjectSchema } from './DelegationUpdateWithoutUsersInput.schema';
import { DelegationUncheckedUpdateWithoutUsersInputObjectSchema } from './DelegationUncheckedUpdateWithoutUsersInput.schema';
import { DelegationCreateWithoutUsersInputObjectSchema } from './DelegationCreateWithoutUsersInput.schema';
import { DelegationUncheckedCreateWithoutUsersInputObjectSchema } from './DelegationUncheckedCreateWithoutUsersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DelegationUpsertWithoutUsersInput> = z
  .object({
    update: z.union([
      z.lazy(() => DelegationUpdateWithoutUsersInputObjectSchema),
      z.lazy(() => DelegationUncheckedUpdateWithoutUsersInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => DelegationCreateWithoutUsersInputObjectSchema),
      z.lazy(() => DelegationUncheckedCreateWithoutUsersInputObjectSchema),
    ]),
  })
  .strict();

export const DelegationUpsertWithoutUsersInputObjectSchema = Schema;
