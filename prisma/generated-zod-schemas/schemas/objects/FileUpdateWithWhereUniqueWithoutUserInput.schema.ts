import { z } from 'zod';
import { FileWhereUniqueInputObjectSchema } from './FileWhereUniqueInput.schema';
import { FileUpdateWithoutUserInputObjectSchema } from './FileUpdateWithoutUserInput.schema';
import { FileUncheckedUpdateWithoutUserInputObjectSchema } from './FileUncheckedUpdateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FileUpdateWithWhereUniqueWithoutUserInput> = z
  .object({
    where: z.lazy(() => FileWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => FileUpdateWithoutUserInputObjectSchema),
      z.lazy(() => FileUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const FileUpdateWithWhereUniqueWithoutUserInputObjectSchema = Schema;
