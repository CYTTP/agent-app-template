import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { ApiResponse } from '@shared/main';
import { map, type Observable } from 'rxjs';
import { createApiResponse, getDefaultMessage } from '../utils/response.util';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T | Record<string, never>>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T | Record<string, never>>> {
    const response = context.switchToHttp().getResponse();
    const statusCode = Number(response?.statusCode ?? HttpStatus.OK);

    return next.handle().pipe(
      map((data) =>
        createApiResponse({
          code: statusCode,
          message: getDefaultMessage(statusCode),
          data,
        }),
      ),
    );
  }
}
