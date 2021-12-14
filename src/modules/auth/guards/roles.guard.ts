import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
        private reflector: Reflector,
        @Inject(forwardRef(() => UserService))
        private userService: UserService
    ) {}
  canActivate(context: ExecutionContext):boolean | Promise<boolean> | Observable<boolean>{
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if(!roles){
        return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () => roles.indexOf(user.role) > -1;
    let hasPermission:boolean = false;
    if(hasRole()){
      hasPermission = true;
    } 
    return user && hasPermission;
  }
}