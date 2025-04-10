import { z } from 'zod';

export const PasswordScalarFieldEnumSchema = z.enum(['id', 'hash', 'userId']);
