import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors,UploadedFile, Req, Res, NotFoundException, Query, UploadedFiles, UseGuards } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Products } from 'src/models/products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { ProductImagesService } from '../images/images.service';
import { diskStorage } from 'multer';
import { editFileName,imageFileFilter } from '../images/file-upload.utils';
import { Pagination } from 'nestjs-typeorm-paginate';
import { join } from 'path';
import { UploadImgDto } from '../images/dto/upload-image.dto';
import { CreateProductInfoDto, PhoneType } from '../product-information/dto/create-productinfo.dto';
import { CreateProductTypeDto } from '../product-type/dto/create-product-type.dto';
import { CreatePromotionDto } from '../promotion/dto/create-promotion.dto';
import { CreateScreenInfoDto } from './dto/create-screen-info.dto';
import { CreateRearCameraInfoDto } from './dto/create-rear-camera-info.dto';
import { CreateOperatingSystemDto } from './dto/create-operating-system-info.dto';
import { CreatePinInfoDto } from './dto/create-pin-info.dto';
import { CreateGeneralInfoDto } from './dto/create-general-info.dto';
import { hasPermission } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
export const storage = {
    storage: diskStorage({
        destination: './images/products',
        filename: editFileName
    }),
    fileFilter:imageFileFilter
}
@Controller('products')
export class ProductsController {
    constructor(
        private readonly productService: ProductsService,
        private readonly imageService: ProductImagesService    
    ){}

    @Get()
    index(
        @Query('page') page: number = 1,
        @Query('limit') limit:number = 10,
        @Query('price') price:number,
        @Query('pin') pin:string,
        @Query('camera') camera:string,
        @Query('design') design:string,
        @Query('screen') screen:string,
        @Query('special') special:string,
        @Query('memory') memory:string,
        @Query('type') type:string,
        @Query('ram') ram:string,
        @Query('key') name:string

    ):Promise<Pagination<any>>{
        limit = limit > 100 ? 100 : limit;
        if(name !== undefined){
            return this.productService.searchProductbyName(
                {page,limit,route:'http://localhost:3000/products'},
                {name}
            )
        }
        else if((price === undefined)&&(pin === undefined)&&(camera === undefined)&&(design === undefined)&&(screen === undefined)&&(special === undefined)&&(memory === undefined)&&(type === undefined)&&(ram === undefined)){
            return this.productService.paginate(
                {page,limit,route:'http://localhost:3000/products'}
            )
        }else{
            const arrayKeys={ price,pin,camera,design,screen,special,memory,type,ram };

            const keys = Object.entries(arrayKeys).map(([key,value]) => {
                if(value !==''){
                    return `${key}=${value}`;
                }
            })
            const url = `http://localhost:3000/products?${keys.join("&")}`;
            return this.productService.filterProduct(
                {page,limit,route:url},
                {price,pin,camera,design,screen,special,type,ram,memory}
            )
        }
    }
    @Get(":id")
    findOne(@Param('id') id):Promise<Products>{
        return this.productService.findOne(id);
    }

    @hasPermission("POST_PRODUCT")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('product_img',storage))
    create(
        @Body() product:CreateProductDto,
        @Body() productInfo:CreateProductInfoDto,
        @Body() productType:CreateProductTypeDto,
        @Body() screenInfo:CreateScreenInfoDto,
        @Body() promotions:CreatePromotionDto,
        @Body() rearCameraInfo:CreateRearCameraInfoDto,
        @Body() operatingSystemInfo:CreateOperatingSystemDto,
        @Body() pinInfo:CreatePinInfoDto,
        @Body() generalInfo:CreateGeneralInfoDto,
        @UploadedFile() img
    ):Promise<any>{
        if(img !== undefined){
            product.product_img = img.filename;
        }
        return this.productService.create(product,productInfo,productType,promotions,screenInfo,rearCameraInfo,operatingSystemInfo,pinInfo,generalInfo);
    }

    @Post('upload/:id')
    @UseInterceptors(FilesInterceptor('images',20,storage))
    async uploadImages(@Param('id') id,@UploadedFiles() files):Promise<any>{
        if(files !== undefined){
            let arrayImg = [];
            for(const file of files){ 
                const upload = {
                    image_path: file.filename,
                    productId:id
                }
                const img =  await this.imageService.uploadImage(upload);
                arrayImg.push(img)
            }
            return arrayImg;
        }
    }

    @Put('upload/:id')
    @UseInterceptors(FilesInterceptor('images',20,storage))
    async updateImg(@Param('id') id,@Body() uploadImg: UploadImgDto,@UploadedFiles() files) {
        const fs = require('fs');
        const product = await this.productService.findOne(id);
        const imagesOld = product.productImages;
        imagesOld.forEach(image =>{
            fs.unlinkSync(join(process.cwd(),'images/product_images/'+image.image_path));
        });
        this.imageService.deleteImage(id);
        if(files !== undefined){
            const arrayImg = [];
            for(const file of files){
                const upload = {
                    image_path:file.filename,
                    productId:id
                }
                const insert = await this.imageService.uploadImage(upload);
                arrayImg.push(insert);
            }
            return arrayImg;
        }  
    }

    @hasPermission("DELETE_PRODUCT")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete(":id")
    async delete(@Param('id') id):Promise<Products>{
        const fs = require('fs');
        const product = await this.productService.findOne(id);
        const imgs = product.productImages;
        // fs.unlinkSync(join(process.cwd(),'images/product_images/'+product.product_img));
        // imgs.forEach(val =>{
        //     fs.unlinkSync(join(process.cwd(),'images/product_images/'+val.image_path));
        // });
        return this.productService.delete(id);
    }
    
    @hasPermission("PUT_PRODUCT")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Put(":id")
    @UseInterceptors(FileInterceptor('product_img',storage))
    update(
        @Param('id') id,
        @Body() product:CreateProductDto,
        @Body() productInfo:CreateProductInfoDto,
        @Body() productType: CreateProductTypeDto,
        @Body() promotions:CreatePromotionDto,
        @Body() screenInfo:CreateScreenInfoDto,
        @Body() rearCameraInfo:CreateRearCameraInfoDto,
        @Body() operatingSystemInfo:CreateOperatingSystemDto,
        @Body() pinInfo:CreatePinInfoDto,
        @Body() generalInfo:CreateGeneralInfoDto,
        @UploadedFile() img
    ):Promise<any>{
        if(img !== undefined){
            product.product_img = img.filename;
        }
        return this.productService.update(id,product,productInfo,productType,promotions,screenInfo,rearCameraInfo,operatingSystemInfo,pinInfo,generalInfo);
    }

    @Get("img/:imgpath")
    sendImage(@Param('imgpath') imgpath,@Res() res){
        return res.sendFile(join(process.cwd(), 'images/products/' + imgpath));
    }
}