import type { HealthResponse } from '@shared/main';

export function createHealthPayload(): HealthResponse {
  return {
    code: 200,
    message: 'OK',
    data: {
      status: 'ok',
      service: 'agent-app-template-server',
      timestamp: new Date().toISOString(),
    },
  };
}
