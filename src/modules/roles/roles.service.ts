import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/models/roles.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create_roles.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Roles)
        private readonly rolesRepository: Repository<Roles>
    ){}
    async findAll():Promise<Roles[]>{
        return await this.rolesRepository.find();
    }
    async create(roleDto:CreateRoleDto): Promise<Roles>{
        return await this.rolesRepository.save(roleDto);
    }
    async update(roleDto:CreateRoleDto,id:number): Promise<Roles>{
        const role = await this.rolesRepository.findOne(id);
        if(!role)
            throw new NotFoundException({
                code: 404,
                message: 'Role not found'
            });
        role.name = roleDto.name;
        return await this.rolesRepository.save(role);
    }
    async delete(id:number):Promise<any>{
        return await this.rolesRepository.delete(id);
    }
}
