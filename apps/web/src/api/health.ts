import { useQuery } from '@tanstack/react-query';
import { ROUTES } from '@shared/main/api';
import type { HealthResponse } from '@shared/main';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

async function fetchHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}${ROUTES.HEALTH}`);

  if (!response.ok) {
    throw new Error('Health check request failed.');
  }

  return response.json() as Promise<HealthResponse>;
}

export function useHealthQuery() {
  return useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
    staleTime: 30_000,
    retry: 1,
  });   
}
