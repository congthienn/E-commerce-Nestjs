import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import console from 'console';
import { Observable } from 'rxjs';
import { RolePermission } from 'src/models/role_permission.entity';
import { UserService } from 'src/modules/user/user.service';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
        @InjectRepository(RolePermission)
        private role_permissionsRepository:Repository<RolePermission>,
        private reflector: Reflector,
        @Inject(forwardRef(() => UserService))
        private userService: UserService
    ) {}
  async canActivate(context: ExecutionContext):Promise<boolean>{
    const getPermission = await this.reflector.get<string[]>('permission',context.getHandler());
    if(!getPermission){
        return true;
    }
    const seleteRoles = await this.role_permissionsRepository.find({
      select:['roleId'],
      relations:['permission'],
      where:{
          permission:{
            permission:ILike(`${getPermission}`)
          }
      }
    });
    
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = seleteRoles.find(item => {
      return item.roleId === user.roleId;
    })
    let hasPermission:boolean = false;
    if(hasRole){
      hasPermission = true;
    } 
    return user && hasPermission;
  }
}