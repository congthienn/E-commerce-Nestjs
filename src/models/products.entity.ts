import { Column, Entity,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryGeneratedColumn, Unique} from "typeorm";
import { Camera } from "./camera.entity";
import { Categories } from "./categories.entity";
import { Design } from "./design.entity";
import { Pin } from "./pin.entity";
import { productImages } from "./productImages.entity";
import { ProductInformation } from "./productInformation.entity";
import { ProductType } from "./product_type.entity";
import { DesignScreen} from "./designScreen.entity";
import { SpecialFeature } from "./special_feature.entity";
import { Promotion } from "./promotion.entity";
import { Comments } from "./comments.entity";
import { Orders } from "./orders.entity";
import { ProductToOrder } from "./ProductToOrder.entity";
import { ProductScreenInfo } from "./screen_info.entity";
import { ProductRearCameraInfo } from "./rear_camera_info.entity";
import { ProductOperatingSystemInfo } from "./operating_system_info.entity";
import { ProductPinInfo } from "./pin_info.entity";
import { ProductGeneralInfo } from "./general _info.entity";

@Entity()
@Unique(['product_name'])
export class Products{
    @PrimaryGeneratedColumn()
    id:number;

    @Column('text')
    product_name:string;

    @Column('int',{default:0})
    product_price:number;

    @Column('text',{nullable: true})
    product_review:string;

    @Column('text',{nullable: true})
    product_img:string;

    @Column()
    categoryId:number;
    
    @ManyToOne(()=>Categories,category => category.products,{onDelete:"SET NULL"})
    category:Categories;

    @OneToMany(() => productImages, productImages => productImages.product)
    productImages:productImages[];

    @OneToOne(() => ProductInformation,productInformation => productInformation.product)
    productInformation:ProductInformation;

    @OneToMany(()=>ProductType,productType => productType.product)
    productType:ProductType[];

    @Column()
    cameraId:number;
    @ManyToOne(()=>Camera,camera => camera.products,{onDelete:"SET NULL"})
    camera:Camera;

    @Column()
    designId:number;
    @ManyToOne(()=>Design,design => design.products,{onDelete:"SET NULL"})
    design:Design;

    @Column()
    pinId:number;
    @ManyToOne(()=>Pin,pin=>pin.products,{onDelete:"SET NULL"})
    pin:Pin;

    @Column()
    designScreenId:number;
    @ManyToOne(()=>DesignScreen,designScreen => designScreen.products,{onDelete:"SET NULL"})
    designScreen:DesignScreen;

    @Column()
    specialFeatureId:number;
    @ManyToOne(()=>SpecialFeature,special_feature=>special_feature.products,{onDelete:"SET NULL"})
    special_feature:SpecialFeature;

    @OneToMany(()=>Promotion,promotion => promotion.product)
    promotion:Promotion[];

    @OneToMany(()=>Comments,comments => comments.product)
    comments:Comments[];

    @OneToOne(() => ProductScreenInfo,screenInfo => screenInfo.product)
    screenInfo:ProductScreenInfo;

    @OneToOne(() => ProductRearCameraInfo,rearCameraInfo => rearCameraInfo.product)
    rearCameraInfo:ProductRearCameraInfo;

    @OneToOne(()=>ProductOperatingSystemInfo,operatingSystemInfo => operatingSystemInfo.product)
    operatingSystemInfo:ProductOperatingSystemInfo;

    @OneToOne(()=>ProductPinInfo,pinInfo => pinInfo.product)
    pinInfo:ProductPinInfo;

    @OneToOne(() => ProductGeneralInfo,generalInfo => generalInfo.product)
    generalInfo:ProductGeneralInfo;
}