import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError } from 'rxjs';
import { ProductInformation } from 'src/models/productInformation.entity';
import { Repository } from 'typeorm';
import { CreateProductInfoDto } from './dto/create-productinfo.dto';

@Injectable()
export class ProductInformationService {
    constructor(
        @InjectRepository(ProductInformation)
        private readonly productInfoRepository:Repository<ProductInformation>
    ){}
    async create(productInfo: CreateProductInfoDto):Promise<any> {
        return await this.productInfoRepository.save(productInfo);
    }
    async update(idProduct:number,productInfo: CreateProductInfoDto):Promise<any>{
        const product = await this.productInfoRepository.findOne({productId:idProduct});
        product.type = productInfo.type;
        product.operating_system = productInfo.operating_system;
        product.rear_camera = productInfo.rear_camera;
        product.front_camera = productInfo.front_camera;
        product.ram = productInfo.ram;
        product.screen = productInfo.screen;
        product.sim = productInfo.sim;
        product.chip = productInfo.chip;
        try{
            const productUpdate = await this.productInfoRepository.save(product);
            const {id,productId,...result} = productUpdate;
            return result;
        }catch(error){
            catchError(error);
        }
    }
}
