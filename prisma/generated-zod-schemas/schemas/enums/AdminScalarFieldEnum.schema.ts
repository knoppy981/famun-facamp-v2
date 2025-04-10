import { z } from 'zod';

export const AdminScalarFieldEnumSchema = z.enum(['id', 'email', 'hash']);
