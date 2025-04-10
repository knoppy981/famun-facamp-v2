import { z } from 'zod';

export const ParticipantTypeSchema = z.enum(['delegate', 'advisor']);
