import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categories } from 'src/models/categories.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){}
    @Get()
    findAll():Promise<Categories[]>{
        return this.categoriesService.findAll();
    }

    @Get(":id")
    findOne(@Param('id') id):Promise<Categories>{
        return this.categoriesService.findOne(id);
    }
    @Post()
    create(@Body() category: CreateCategoryDto):Promise<Categories>{
        return this.categoriesService.create(category);
    }
    @Delete(":id")
    delete(@Param('id') id):Promise<Categories>{
        return this.categoriesService.delete(id);
    }
    @Put(":id")
    update(@Param('id') id,@Body() category:CreateCategoryDto):Promise<Categories>{
        return this.categoriesService.update(id,category);
    }
}
