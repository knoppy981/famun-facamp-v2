import { z } from 'zod';
import { FileCreateWithoutUserInputObjectSchema } from './FileCreateWithoutUserInput.schema';
import { FileUncheckedCreateWithoutUserInputObjectSchema } from './FileUncheckedCreateWithoutUserInput.schema';
import { FileCreateOrConnectWithoutUserInputObjectSchema } from './FileCreateOrConnectWithoutUserInput.schema';
import { FileCreateManyUserInputEnvelopeObjectSchema } from './FileCreateManyUserInputEnvelope.schema';
import { FileWhereUniqueInputObjectSchema } from './FileWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FileUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => FileCreateWithoutUserInputObjectSchema),
          z.lazy(() => FileCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => FileUncheckedCreateWithoutUserInputObjectSchema),
          z.lazy(() => FileUncheckedCreateWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => FileCreateOrConnectWithoutUserInputObjectSchema),
          z.lazy(() => FileCreateOrConnectWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => FileCreateManyUserInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => FileWhereUniqueInputObjectSchema),
          z.lazy(() => FileWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const FileUncheckedCreateNestedManyWithoutUserInputObjectSchema = Schema;
