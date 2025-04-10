import { z } from 'zod';
import { UserCreateManyDelegationInputObjectSchema } from './UserCreateManyDelegationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateManyDelegationInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => UserCreateManyDelegationInputObjectSchema),
      z.lazy(() => UserCreateManyDelegationInputObjectSchema).array(),
    ]),
  })
  .strict();

export const UserCreateManyDelegationInputEnvelopeObjectSchema = Schema;
