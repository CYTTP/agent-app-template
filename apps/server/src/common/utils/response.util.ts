import { HttpStatus } from '@nestjs/common';
import type { ApiResponse } from '@shared/main';

const DEFAULT_SUCCESS_MESSAGE: Record<number, string> = {
  [HttpStatus.OK]: 'OK',
  [HttpStatus.CREATED]: 'Created',
  [HttpStatus.ACCEPTED]: 'Accepted',
  [HttpStatus.NO_CONTENT]: 'No Content',
};

export function getDefaultMessage(code: number): string {
  return DEFAULT_SUCCESS_MESSAGE[code] ?? 'OK';
}

export function normalizeResponseData<T>(data: T): T | Record<string, never> {
  if (data === null || data === undefined) {
    return {};
  }

  return data;
}

export function createApiResponse<T>(options: {
  code: number;
  message?: string;
  data: T;
}): ApiResponse<T | Record<string, never>> {
  return {
    code: options.code,
    message: options.message ?? getDefaultMessage(options.code),
    data: normalizeResponseData(options.data),
  };
}
