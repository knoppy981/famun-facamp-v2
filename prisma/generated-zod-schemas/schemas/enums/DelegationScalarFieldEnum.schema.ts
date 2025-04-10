import { z } from 'zod';

export const DelegationScalarFieldEnumSchema = z.enum([
  'id',
  'code',
  'inviteLink',
  'school',
  'phoneNumber',
  'paymentExpirationDate',
  'participationMethod',
  'maxDelegates',
  'maxAdvisors',
  'createdAt',
  'updatedAt',
]);
