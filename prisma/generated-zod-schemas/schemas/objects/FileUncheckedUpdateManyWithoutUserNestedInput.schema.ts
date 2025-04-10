import { z } from 'zod';
import { FileCreateWithoutUserInputObjectSchema } from './FileCreateWithoutUserInput.schema';
import { FileUncheckedCreateWithoutUserInputObjectSchema } from './FileUncheckedCreateWithoutUserInput.schema';
import { FileCreateOrConnectWithoutUserInputObjectSchema } from './FileCreateOrConnectWithoutUserInput.schema';
import { FileUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './FileUpsertWithWhereUniqueWithoutUserInput.schema';
import { FileCreateManyUserInputEnvelopeObjectSchema } from './FileCreateManyUserInputEnvelope.schema';
import { FileWhereUniqueInputObjectSchema } from './FileWhereUniqueInput.schema';
import { FileUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './FileUpdateWithWhereUniqueWithoutUserInput.schema';
import { FileUpdateManyWithWhereWithoutUserInputObjectSchema } from './FileUpdateManyWithWhereWithoutUserInput.schema';
import { FileScalarWhereInputObjectSchema } from './FileScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FileUncheckedUpdateManyWithoutUserNestedInput> =
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
      upsert: z
        .union([
          z.lazy(() => FileUpsertWithWhereUniqueWithoutUserInputObjectSchema),
          z
            .lazy(() => FileUpsertWithWhereUniqueWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => FileCreateManyUserInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => FileWhereUniqueInputObjectSchema),
          z.lazy(() => FileWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => FileWhereUniqueInputObjectSchema),
          z.lazy(() => FileWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => FileWhereUniqueInputObjectSchema),
          z.lazy(() => FileWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => FileWhereUniqueInputObjectSchema),
          z.lazy(() => FileWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => FileUpdateWithWhereUniqueWithoutUserInputObjectSchema),
          z
            .lazy(() => FileUpdateWithWhereUniqueWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => FileUpdateManyWithWhereWithoutUserInputObjectSchema),
          z
            .lazy(() => FileUpdateManyWithWhereWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => FileScalarWhereInputObjectSchema),
          z.lazy(() => FileScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const FileUncheckedUpdateManyWithoutUserNestedInputObjectSchema = Schema;
