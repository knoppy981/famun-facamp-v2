import { z } from 'zod';

export const SexSchema = z.enum(['masc', 'fem', 'other']);
