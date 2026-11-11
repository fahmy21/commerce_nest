import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import {tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    let now=Date.now()
    console.log('befor interceptor');
    return next
    .handle()
    .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
