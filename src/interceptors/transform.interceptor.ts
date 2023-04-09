import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable } from "rxjs";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        context.switchToHttp()
          .getResponse()
          .status(data?.error ? data.code : 201);
        return data?.error ? data : {
          data: data,
          code: 201,
          success: true,
        };
      }),
    );
  }
}
