import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError } from 'rxjs';
import {Categories} from '../../models/categories.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Categories)
        private readonly categoryRepository: Repository<Categories>
    ){}
    async findAll():Promise<Categories[]>{
        return await this.categoryRepository.find({
            order:{id:"ASC"}
        });
    }
    async findOne(id:number):Promise<Categories>{
        const category = await this.categoryRepository.findOne(id);
        if(!category)
            throw new NotFoundException({
                code:404,
                message: 'Category not found'
            });
        return category;
    }
    async create(category:CreateCategoryDto):Promise<Categories>{
        try {
            const newCategory = await this.categoryRepository.save(category);
            if(!newCategory)
                throw new NotFoundException({
                    code:404,
                    message:'Cannot create category',
                });
            return newCategory;
        } catch (error) {
            catchError(error)
        }
    }
    async delete(id:number):Promise<any>{
        return await this.categoryRepository.delete(id);
    }
    async update(id:number,newCategory:CreateCategoryDto):Promise<Categories>{
        const category = await this.categoryRepository.findOne({
            where: {id:id}
        });
        if(!category)
            throw new NotFoundException({
                code: 404,
                message: 'Category not found',
            });
        category.category_name = newCategory.category_name;
        try {
            return await this.categoryRepository.save(category);
        } catch (error) {
            catchError(error);
        }
    }
}
