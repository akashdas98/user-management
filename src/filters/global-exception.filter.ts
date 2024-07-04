import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';
import { ERROR } from 'src/consts';

@Catch()
export default class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: Error | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status, message;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    } else {
      ({ message, status } = ERROR[exception.message] || {
        message: 'Internal server error.',
        status: 500,
      });
    }

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
