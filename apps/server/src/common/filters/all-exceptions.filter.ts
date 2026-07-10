import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ZodError } from 'zod';
import { createApiResponse } from '../utils/response.util';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let details: unknown;

    if (exception instanceof ZodError) {
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'Validation failed';
      details = exception.flatten();
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();

      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (exceptionResponse && typeof exceptionResponse === 'object') {
        const normalizedResponse = exceptionResponse as Record<string, unknown>;
        const responseMessage = normalizedResponse.message;

        if (typeof responseMessage === 'string') {
          message = responseMessage;
        } else if (Array.isArray(responseMessage) && responseMessage.length > 0) {
          message = responseMessage.join(', ');
        } else {
          message = HttpStatus[statusCode] ?? message;
        }

        details = normalizedResponse;
      }
    } else if (exception instanceof Error) {
      details = { name: exception.name };
      message = exception.message || message;
    }

    response.status(statusCode).json(
      createApiResponse({
        code: statusCode,
        message,
        data: {
          path: request.url,
          timestamp: new Date().toISOString(),
          ...(details ? { details } : {}),
        },
      }),
    );
  }
}
