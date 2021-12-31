import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categories } from 'src/models/categories.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { hasPermission } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){}
    
    @hasPermission("GET_CATEGORY")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get()
    findAll():Promise<Categories[]>{
        return this.categoriesService.findAll();
    }

    @hasPermission("GET_CATEGORY")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get(":id")
    findOne(@Param('id') id):Promise<Categories>{
        return this.categoriesService.findOne(id);
    }

    @hasPermission("POST_CATEGORY")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post()
    create(@Body() category: CreateCategoryDto):Promise<Categories>{
        return this.categoriesService.create(category);
    }

    @hasPermission("DELETE_CATEGORY")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete(":id")
    delete(@Param('id') id):Promise<Categories>{
        return this.categoriesService.delete(id);
    }

    @hasPermission("PUT_CATEGORY")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Put(":id")
    update(@Param('id') id,@Body() category:CreateCategoryDto):Promise<Categories>{
        return this.categoriesService.update(id,category);
    }
}
