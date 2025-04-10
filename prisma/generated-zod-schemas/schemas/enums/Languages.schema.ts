import { z } from 'zod';

export const LanguagesSchema = z.enum(['portuguese', 'english', 'spanish']);
