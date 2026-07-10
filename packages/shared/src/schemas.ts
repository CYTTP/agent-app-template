import { z } from 'zod';

export const createApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    code: z.number().int().min(100).max(599),
    message: z.string().min(1),
    data: dataSchema,
  });

export const HealthDataSchema = z.object({
  status: z.literal('ok'),
  database: z.object({
    status: z.literal('ok'),
  }),
  service: z.string().min(1),
  timestamp: z.string().datetime(),
});

export const HealthResponseSchema = createApiResponseSchema(HealthDataSchema);
