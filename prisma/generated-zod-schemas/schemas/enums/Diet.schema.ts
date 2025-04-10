import { z } from 'zod';

export const DietSchema = z.enum(['vegan', 'vegetarian', 'other']);
