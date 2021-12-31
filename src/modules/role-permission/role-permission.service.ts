import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermission } from 'src/models/role_permission.entity';
import { Repository } from 'typeorm';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';

@Injectable()
export class RolePermissionService {
    constructor(
        @InjectRepository(RolePermission)
        private readonly rolePermissionRepository: Repository<RolePermission>
    ){}
    async findAll():Promise<RolePermission[]>{
        return await this.rolePermissionRepository.find({
            relations:['role','permission']
        });
    }
    async findOne(roleId:number):Promise<RolePermission[]>{
        return await this.rolePermissionRepository.find({
            where:{roleId:roleId},
            relations:['role','permission']
        });
    }
    async create(rolePermissionDto:CreateRolePermissionDto):Promise<any>{
        const roleId = rolePermissionDto.roleId;
        const arrayPermissionId = rolePermissionDto.permissionId;
        const response = [];
        for(let i =0 ;i < arrayPermissionId.length;i++){
            const permissionId = arrayPermissionId[i];
            const rolePermissionDto = {
                roleId,permissionId
            }
            const result = await this.rolePermissionRepository.save(rolePermissionDto);
            response.push(result);
        }
        return response;
    }
    async update(rolePermissionDto:CreateRolePermissionDto):Promise<any>{
        await this.rolePermissionRepository.delete({roleId:rolePermissionDto.roleId});
        return this.create(rolePermissionDto);
    }
}
