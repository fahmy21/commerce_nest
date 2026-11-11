import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpCode } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class transformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    console.log('befor interceptor');
    let now=Date.now()
    return next
    .handle()
    .pipe(
        map((data)=>({
                success:true,
                statusCode:context.switchToHttp().getResponse().statusCode,
                data
    }))
)
  }
}
