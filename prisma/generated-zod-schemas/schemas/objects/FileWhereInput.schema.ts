import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BytesFilterObjectSchema } from './BytesFilter.schema';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserRelationFilterObjectSchema } from './UserRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FileWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => FileWhereInputObjectSchema),
        z.lazy(() => FileWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => FileWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => FileWhereInputObjectSchema),
        z.lazy(() => FileWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    userId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    url: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    type: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    fileName: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    stream: z
      .union([z.lazy(() => BytesFilterObjectSchema), z.instanceof(Buffer)])
      .optional(),
    contentType: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    size: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const FileWhereInputObjectSchema = Schema;
