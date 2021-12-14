import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/models/products.entity';
import { ProductType } from 'src/models/product_type.entity';
import { Repository } from 'typeorm';
import { CreateProductTypeDto, memory } from './dto/create-product-type.dto';
import { InsertQuantityDto } from './dto/insert-quantity.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';

@Injectable()
export class ProductTypeService {
    constructor(
        @InjectRepository(ProductType)
        private readonly productTypeRepository:Repository<ProductType>,
        @InjectRepository(Products)
        private readonly productRepository:Repository<Products>
    ){}
    async findAll():Promise<any>{
        return await this.productTypeRepository.find();
    }
    async findOne(productId:number):Promise<ProductType[]>{
        return await this.productTypeRepository.find({
            select:['id','memory'],
            where:[
                {productId:productId}
            ]
        })
    }
    async create(productTypes:CreateProductTypeDto):Promise<any>{
        let arrayProductType=[];
        let arrayProduct = productTypes.memory;
        let price_min = 10000000000000;
        for(let i=0;i<arrayProduct.length;i++){
            const productType = {
                productId:productTypes.productId,
                memory:productTypes.memory[i],
                quantity:productTypes.quantity[i],
                price:productTypes.price[i]
            }
            const create = await this.productTypeRepository.save(productType);
            if(productTypes.price[i] < price_min){
                price_min = productTypes.price[i];
            }
            arrayProductType.push(create);
        }
        const product = await this.productRepository.findOne({
            where:{id:productTypes.productId}
        });
        product.product_price = price_min;
        const updateprice = await this.productRepository.save(product);
        return arrayProductType;
       
    }
    async update(productTypes:UpdateProductTypeDto):Promise<any>{
        let arrayProduct = productTypes.memory;
        let arrayProductType=[];
        let price_min = 10000000000000;
        for(let i=0; i<arrayProduct.length; i++){
            const memoryid = productTypes.memory[i];
            const searchProductType = await this.productTypeRepository.findOne({
                where:[{productId:productTypes.productId,memory:memoryid}]
            });
            if(productTypes.price[i] < price_min){
                price_min = productTypes.price[i];
            }
            if(searchProductType){
                searchProductType.quantity = productTypes.quantity[i];
                searchProductType.price = productTypes.price[i];
                const update = await this.productTypeRepository.save(searchProductType);
                arrayProductType.push(update);
            }else{
                const productTypeNew = {
                    productId:productTypes.productId,
                    memory:productTypes.memory[i],
                    quantity:productTypes.quantity[i],
                    price:productTypes.price[i]
                }
                const newProductType = await this.productTypeRepository.save(productTypeNew);
                arrayProductType.push(newProductType);
            }
        }   
        const product = await this.productRepository.findOne({
            where:{id:productTypes.productId}
        });
        product.product_price = price_min;
        await this.productRepository.save(product);
        return arrayProductType;
    }
    async delete(id:number):Promise<any>{
        return await this.productTypeRepository.delete(id);
    }
    async updateQuantity(quantityProduct:UpdateQuantityDto):Promise<ProductType>{
        const product = await this.productTypeRepository.findOne({
            where: [
                {
                    productId:quantityProduct.productId,
                    memory:quantityProduct.memory
                }
            ]
        });
        if(product.quantity < quantityProduct.sold)
            throw new NotFoundException({
                code: 404,
                message: 'The quantity does not match'
            })
        product.sold = quantityProduct.sold;
        product.quantity -= quantityProduct.sold;
        return await this.productTypeRepository.save(product);
    }
    async insertQuantity(quantityProduct:InsertQuantityDto):Promise<ProductType>{
        const product = await this.productTypeRepository.findOne({
            where: [
                {
                    productId:quantityProduct.productId,
                    memory:quantityProduct.memory
                }
            ]
        });
        product.quantity += quantityProduct.quantity;
        return await this.productTypeRepository.save(product);
    }
}
