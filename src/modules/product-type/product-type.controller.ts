import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductType } from 'src/models/product_type.entity';
import { CreateProductTypeDto} from './dto/create-product-type.dto';
import { InsertQuantityDto } from './dto/insert-quantity.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ProductTypeService } from './product-type.service';

@Controller('type')
export class ProductTypeController {
    constructor(
        private readonly productTypeService: ProductTypeService
    ){}
    @Get()
    findAll():Promise<any>{
        return this.productTypeService.findAll();
    }

    @Post()
    create(@Body() productType: CreateProductTypeDto):Promise<any>{
        return this.productTypeService.create(productType);
    }
    @Get(":productId")
    findOne(@Param("productId") productId):Promise<ProductType[]>{
        return this.productTypeService.findOne(productId);
    }

    @Put()
    update(@Body() productType:UpdateProductTypeDto):Promise<any>{
        return this.productTypeService.update(productType);
    }

    @Delete(":id")
    delete(@Param('id') id):Promise<any>{
        return this.productTypeService.delete(id);
    }

    @Put("/quantity")
    updateQuantity(@Body() insertQuantity:InsertQuantityDto):Promise<any>{
        return this.productTypeService.insertQuantity(insertQuantity);
    }
}