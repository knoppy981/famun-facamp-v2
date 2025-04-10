import { z } from 'zod';
import { FileWhereUniqueInputObjectSchema } from './FileWhereUniqueInput.schema';
import { FileCreateWithoutUserInputObjectSchema } from './FileCreateWithoutUserInput.schema';
import { FileUncheckedCreateWithoutUserInputObjectSchema } from './FileUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FileCreateOrConnectWithoutUserInput> = z
  .object({
    where: z.lazy(() => FileWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => FileCreateWithoutUserInputObjectSchema),
      z.lazy(() => FileUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const FileCreateOrConnectWithoutUserInputObjectSchema = Schema;
