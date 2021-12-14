import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { extname } from 'path';
import { productImages } from 'src/models/productImages.entity';
import { Repository } from 'typeorm';
import { UploadImgDto } from './dto/upload-image.dto';
@Injectable()
export class ProductImagesService {
    constructor(
        @InjectRepository(productImages)
        private readonly imageRepository:Repository<productImages>
    ){}
    async uploadImage(imageProduct: UploadImgDto):Promise<any>{
        return await this.imageRepository.save(imageProduct);
    }
    async deleteImage(id:number){
        this.imageRepository.delete({productId:id});
    }
}