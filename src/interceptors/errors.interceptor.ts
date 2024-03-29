import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(async (err) => {
        Logger.error(err);
        context.switchToHttp().getResponse().status(err.status);

        err.code;

        if (err.response?.message) {
          return {
            error: {
              message: err.response?.message,
              name: err.response?.error,
              exception: err?.name,
            },
            code: err.status,
            success: false,
          };
        }

        return {
          error: {
            message: err.message,
            name: err.name,
            exception: err.name,
          },
          code: err.status,
          success: false,
        };
      }),
    );
  }
}
