import { z } from 'zod';
import { FileWhereUniqueInputObjectSchema } from './FileWhereUniqueInput.schema';
import { FileUpdateWithoutUserInputObjectSchema } from './FileUpdateWithoutUserInput.schema';
import { FileUncheckedUpdateWithoutUserInputObjectSchema } from './FileUncheckedUpdateWithoutUserInput.schema';
import { FileCreateWithoutUserInputObjectSchema } from './FileCreateWithoutUserInput.schema';
import { FileUncheckedCreateWithoutUserInputObjectSchema } from './FileUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FileUpsertWithWhereUniqueWithoutUserInput> = z
  .object({
    where: z.lazy(() => FileWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => FileUpdateWithoutUserInputObjectSchema),
      z.lazy(() => FileUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => FileCreateWithoutUserInputObjectSchema),
      z.lazy(() => FileUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const FileUpsertWithWhereUniqueWithoutUserInputObjectSchema = Schema;
