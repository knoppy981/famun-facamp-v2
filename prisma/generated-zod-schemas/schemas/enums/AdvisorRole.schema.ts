import { z } from 'zod';

export const AdvisorRoleSchema = z.enum([
  'teacher',
  'coordinator',
  'principal',
  'other',
]);
