import { Injectable, NotFoundException, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { catchError } from 'rxjs';
import { ProductGeneralInfo } from 'src/models/general _info.entity';
import { ProductOperatingSystemInfo } from 'src/models/operating_system_info.entity';
import { ProductPinInfo } from 'src/models/pin_info.entity';
import { Products } from 'src/models/products.entity';
import { ProductType } from 'src/models/product_type.entity';
import { ProductRearCameraInfo } from 'src/models/rear_camera_info.entity';
import { ProductScreenInfo } from 'src/models/screen_info.entity';
import { Between, ILike, In, Like, Repository } from 'typeorm';
import { CreateProductInfoDto } from '../product-information/dto/create-productinfo.dto';
import { ProductInformationService } from '../product-information/product-information.service';
import { CreateProductTypeDto } from '../product-type/dto/create-product-type.dto';
import { ProductTypeService } from '../product-type/product-type.service';
import { CreatePromotionDto } from '../promotion/dto/create-promotion.dto';
import { PromotionService } from '../promotion/promotion.service';
import { CreateGeneralInfoDto } from './dto/create-general-info.dto';
import { CreateOperatingSystemDto } from './dto/create-operating-system-info.dto';
import { CreatePinInfoDto } from './dto/create-pin-info.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateRearCameraInfoDto } from './dto/create-rear-camera-info.dto';
import { CreateScreenInfoDto } from './dto/create-screen-info.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { SearchProductByName } from './dto/search-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products)
        private readonly productRepository: Repository<Products>,

        @InjectRepository(ProductType)
        private readonly productTypeRepository:Repository<ProductType>,

        @InjectRepository(ProductScreenInfo)
        private readonly screenInfoRepository:Repository<ProductScreenInfo>,

        @InjectRepository(ProductRearCameraInfo)
        private readonly rearCameraInfoRepository:Repository<ProductRearCameraInfo>,

        @InjectRepository(ProductOperatingSystemInfo)
        private readonly operatingSystemInfoRepository:Repository<ProductOperatingSystemInfo>,

        @InjectRepository(ProductPinInfo)
        private readonly pinInfoRepository:Repository<ProductPinInfo>,

        @InjectRepository(ProductGeneralInfo)
        private readonly generalInfoRepository:Repository<ProductGeneralInfo>,

        private readonly promotionService:PromotionService,
        private readonly productInfoService: ProductInformationService,
        private readonly productTypeService:ProductTypeService,
    ){}
    async findAll():Promise<Products[]>{
        return await this.productRepository.find({ relations:['category','productImages','productInformation']});
    }
    async findOne(id:number):Promise<Products>{
        const product = await this.productRepository.findOne(id,
            { 
                relations:[
                    'category',
                    'productImages',
                    'productInformation',
                    'productType',
                    'camera',
                    'pin',
                    'designScreen',
                    'special_feature',
                    'design',
                    'promotion',
                    'screenInfo',
                    'rearCameraInfo',
                    'operatingSystemInfo',
                    'pinInfo',
                    'generalInfo'
                ]
            },
        );
        if(!product)
            throw new NotFoundException({
                code: 404,
                message: 'Product not found'
            });
        return product;
    }
    async create(
        product:CreateProductDto,
        productInfo:CreateProductInfoDto,
        productType:CreateProductTypeDto,
        promotions:CreatePromotionDto,
        screenInfo:CreateScreenInfoDto,
        rearCameraInfo:CreateRearCameraInfoDto,
        operatingSystemInfo:CreateOperatingSystemDto,
        pinInfo:CreatePinInfoDto,
        generalInfo:CreateGeneralInfoDto
    ):Promise<any>{
        try {
            const newProduct = await this.productRepository.save(product);
            if(!newProduct)
                throw new NotFoundException({
                    code:404,
                    message: 'Cannot create product'
                });
            const productID = newProduct.id;
            productType.productId = productID;
            const type =  this.productTypeService.create(productType);

            promotions.productId = productID;
            const promotion = this.promotionService.create(promotions);

            productInfo.productId = productID;
            const info =  this.productInfoService.create(productInfo);
            
            screenInfo.productId = productID;
            const screen_Info = await this.screenInfoRepository.save(screenInfo); 

            rearCameraInfo.productId = productID;
            const rearCamera_Info = await this.rearCameraInfoRepository.save(rearCameraInfo);

            operatingSystemInfo.productId = productID;
            const operatingSystem_Info = await this.operatingSystemInfoRepository.save(operatingSystemInfo);

            pinInfo.productId = productID;
            const pin_Info = await this.pinInfoRepository.save(pinInfo);

            generalInfo.productId = productID;
            const general_Info = await this.generalInfoRepository.save(generalInfo)

            const result = {...newProduct,...info,...type,...promotion};
            return result;
        } catch (error) {
            catchError(error);
        }
    }
    async delete(id:number):Promise<any> {
        return await this.productRepository.delete(id);
    }
    async update(
        id:number, 
        product:CreateProductDto,
        productInfo:CreateProductInfoDto,
        productType:CreateProductTypeDto,
        promotions:CreatePromotionDto,
        screenInfo:CreateScreenInfoDto,
        rearCameraInfo:CreateRearCameraInfoDto,
        operatingSystemInfo:CreateOperatingSystemDto,
        pinInfo:CreatePinInfoDto,
        generalInfo:CreateGeneralInfoDto
    ):Promise<any> {
        const fs = require('fs');
        const newProduct = await this.productRepository.findOne(id);
        if(!newProduct)
            throw new NotFoundException({
                code: 404,
                message: 'Products not found',
            });
        // fs.unlinkSync(join(process.cwd(), 'images/product_images/' + newProduct.product_img ));
        newProduct.product_name = product.product_name;
        newProduct.product_review = product.product_review;
        newProduct.product_img = product.product_img;
        newProduct.categoryId = product.categoryId;
        newProduct.cameraId = product.cameraId;
        newProduct.designId = product.designId;
        newProduct.designScreenId = product.designScreenId;
        newProduct.specialFeatureId = product.specialFeatureId;
        newProduct.pinId = product.pinId;
        
        const screen_Info = await this.screenInfoRepository.findOne({productId:id});
        screen_Info.maximum_light = screenInfo.maximum_light;
        screen_Info.resolution = screenInfo.resolution;
        screen_Info.screen_technology = screenInfo.screen_technology;
        screen_Info.touch_screen = screenInfo.touch_screen;
        screen_Info.widescreen = screenInfo.widescreen;

        const rearCamera_Info = await this.rearCameraInfoRepository.findOne({productId:id});
        rearCamera_Info.camera_resolution = rearCameraInfo.camera_resolution;
        rearCamera_Info.feature = rearCameraInfo.feature;
        rearCamera_Info.film = rearCameraInfo.film;
        rearCamera_Info.flash_light = rearCameraInfo.flash_light;

        const operatingSystem_Info = await this.operatingSystemInfoRepository.findOne({productId:id});
        operatingSystem_Info.CPU = operatingSystemInfo.CPU;
        operatingSystem_Info.CPU_speed = operatingSystemInfo.CPU_speed;
        operatingSystem_Info.GPU = operatingSystemInfo.GPU;
        operatingSystem_Info.operatingSystem = operatingSystemInfo.operatingSystem;

        const pin_Info = await this.pinInfoRepository.findOne({productId:id});
        pin_Info.capacity = pinInfo.capacity;
        pin_Info.charging_port = pinInfo.charging_port;
        pin_Info.maximum_support = pinInfo.maximum_support;
        pin_Info.pin_technology = pinInfo.pin_technology;
        pin_Info.pin_type = pinInfo.pin_type;

        const general_Info = await this.generalInfoRepository.findOne({productId:id});
        general_Info.debut_time = generalInfo.debut_time;
        general_Info.material = general_Info.material;
        general_Info.productDesign = generalInfo.productDesign;
        general_Info.volume_size = generalInfo.volume_size;
        try {
            const resultProduct = await this.productRepository.save(newProduct);
            const resultScreen = await this.screenInfoRepository.save(screen_Info);
            const resultRearCamera= await this.rearCameraInfoRepository.save(rearCamera_Info);
            const resultPin =await this.pinInfoRepository.save(pin_Info);
            const resultOperating=await this.operatingSystemInfoRepository.save(operatingSystem_Info);
            const resultGerenal=await this.generalInfoRepository.save(general_Info);
            const Info = await this.productInfoService.update(id,productInfo);
            productType.productId = id;
            const Type = await this.productTypeService.update(productType);
            promotions.productId = id;
            const Promotion = await this.promotionService.update(promotions);
            const result = {...resultProduct,...Info,...Type,...Promotion,...resultScreen,...resultOperating,...resultRearCamera,...resultGerenal,...resultPin};
            return result;
        } catch (error) {
            catchError(error);
        }
    }
    async sendImage(path:string,@Res() res){
        return await res.sendFile(path, { root: './images' });
    }
    async paginate(options: IPaginationOptions):Promise<Pagination<Products>>{
        return await paginate<Products>(this.productRepository,options,{
            order:{id:"ASC"},
            relations:['category','productInformation']
        });
    }
    async searchProductbyName(options:IPaginationOptions,key:SearchProductByName):Promise<Pagination<any>>{
        return await paginate<ProductType>(this.productTypeRepository,options,{
            relations:['product'],
            where:{
                product:{
                    product_name:ILike(`%${key.name}%`)
                }
            }
        });
    }
    async filterProduct(options:IPaginationOptions,product:FilterProductDto):Promise<Pagination<any>>{
        const filterPrice = (product.price !== undefined) ? Between(0,Number(product.price)): Between(0,2000000000);
        const filterRam = (product.ram !== undefined ) ? In(product.ram.split(",")): Like(`%%`);
        const filterType = (product.type !== undefined) ? In(product.type.split(",")) : In(['iOS','android']);
        const filterMemory = (product.memory !== undefined) ? In(product.memory.split(",")) : In(['32GB','64GB','128GB','256GB','512GB']);
        const filterPin = (product.pin !== undefined) ? In(product.pin.split(",")) : Between(0,2000000000);
        const filterCamera = (product.camera !== undefined) ? In(product.camera.split(",")) : Between(0,2000000000);
        const filterDesign = (product.design !== undefined) ? In(product.design.split(",")) : Between(0,2000000000);
        const filterScreen = (product.screen !== undefined) ? In(product.screen.split(",")) : Between(0,2000000000);
        const filterSpecial = (product.special !== undefined) ? In(product.special.split(",")) : Between(0,2000000000);
        return await paginate<ProductType>(this.productTypeRepository,options,{
            relations:[
                'product',
                'product.productInformation',
                'product.camera',
                'product.design',
                'product.pin',
                'product.designScreen',
                'product.special_feature'
            ],
            where:{
                memory:filterMemory,
                price:filterPrice,
                product:{
                    pin:{
                        id:filterPin
                    },
                    productInformation:{
                        ram:filterRam,
                        type:filterType
                    },
                    camera:{
                        id:filterCamera
                    },
                    special_feature:{
                        id:filterSpecial
                    },
                    design:{
                        id:filterDesign
                    },
                    designScreen:{
                        id:filterScreen
                    }
                }
            }
        });
    }
}