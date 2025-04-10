import { z } from 'zod';

export const EducationLevelSchema = z.enum([
  'university',
  'school',
  'prep_school',
]);
