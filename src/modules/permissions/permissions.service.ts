import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Permissions } from 'src/models/permissions.entity';
import { CreatePermissionDto } from './dto/create-permissions.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(Permissions)
        private readonly permissionsRepository:Repository<Permissions>
    ){}
    async findAll():Promise<Permissions[]>{
        return await this.permissionsRepository.find();
    }
    async findOne(name:string):Promise<Permissions[]>{
        return await this.permissionsRepository.find({
            where:{permission:ILike(`%${name}%`)}
        });
    }
    async create(permissionDto:CreatePermissionDto):Promise<Permissions>{
        return await this.permissionsRepository.save(permissionDto);
    }
    async delete(id:number):Promise<any>{
        return await this.permissionsRepository.delete(id);
    }
    async update(permissionDto:UpdatePermissionDto,id:number):Promise<Permissions>{
        const permission = await this.permissionsRepository.findOne({id:id});
        if(!permission)
            throw new NotFoundException({
                code: 404,
                message:"Permission not found",
            })
        permission.name = permissionDto.name;
        return await this.permissionsRepository.save(permission);
    }
}
