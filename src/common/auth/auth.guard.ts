import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from "jsonwebtoken";
import { Observable } from 'rxjs';
import { TokenService } from './../service/token/token.service.js';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService:TokenService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request=context.switchToHttp().getRequest<Request & {user:JwtPayload |string}>()
    if(request.headers.authorization){
      throw new BadRequestException('token is not foubd') 
    }
    let [flag,token]=request.headers.authorization?.split(' ') as string[]
    if (flag !== 'Bearer' || !token) throw new UnauthorizedException('invalid token format')
      let decodeData=this.tokenService.decodeToken(token)
    if(!decodeData) throw new BadRequestException('token is not valid')
    request.user=decodeData
    return true;
  }
}
