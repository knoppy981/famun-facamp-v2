import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ConfirmationCodeOrderByInputObjectSchema } from './ConfirmationCodeOrderByInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AdminOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    hash: z.lazy(() => SortOrderSchema).optional(),
    confirmationCode: z
      .lazy(() => ConfirmationCodeOrderByInputObjectSchema)
      .optional(),
  })
  .strict();

export const AdminOrderByWithRelationInputObjectSchema = Schema;
