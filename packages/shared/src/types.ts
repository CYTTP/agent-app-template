export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data?: T;
}

export interface HealthData {
  status: 'ok';
  service: string;
  timestamp: string;
}

export type HealthResponse = ApiResponse<HealthData>;
