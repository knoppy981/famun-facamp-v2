import { z } from 'zod';

export const FileScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'url',
  'type',
  'fileName',
  'stream',
  'contentType',
  'size',
  'createdAt',
]);
