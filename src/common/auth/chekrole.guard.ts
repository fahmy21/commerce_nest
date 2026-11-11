import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { JwtPayload } from "jsonwebtoken";
import { Model } from 'mongoose';
import { User } from '../../model/user.model.js';
import { ROLES_KEY } from '../decorators/roles.decorators.js';
@Injectable()
export class checkRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector,
    @InjectModel(User.name) private readonly _userModel:Model<User>
  ){}
 async canActivate(
    context: ExecutionContext,
  ){
    const roles=this.reflector.getAllAndOverride<number[]>(
        ROLES_KEY,
        [context.getHandler(),context.getClass()]
    )
    if (!roles?.length) {
      return true;
    }
    const request=context.switchToHttp().getRequest<Request & {user:JwtPayload |string}>()
    let {id}=request.user as JwtPayload
    let existUser=await this._userModel.findById(id)
    if (!existUser) {
        throw new NotFoundException("user is not found")
    }
     if (!roles.includes(+existUser.role)) {
        throw new ForbiddenException('unauthorized for Api')
      }

    
    return true;
  }
}
