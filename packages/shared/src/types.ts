export interface ApiResponse<T = Record<string, unknown>> {
  code: number;
  message: string;
  data: T;
}

export interface ApiErrorData {
  path: string;
  timestamp: string;
  details?: unknown;
}

export interface HealthData {
  status: 'ok';
  database: {
    status: 'ok';
  };
  service: string;
  timestamp: string;
}

export type HealthResponse = ApiResponse<HealthData>;
export type ApiErrorResponse = ApiResponse<ApiErrorData>;
