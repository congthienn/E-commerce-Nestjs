import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import ormconfig from './ormconfig';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './modules/customer/customer.module';
import { MailModule } from './service/mail/mail.module';
import { ProductImagesModule } from './modules/images/images.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './modules/auth/auth.module';
import { ProductInformationModule } from './modules/product-information/product-information.module';
import { ProvinceModule } from './modules/province/province.module';
import { DistrictController } from './modules/district/district.controller';
import { DistrictService } from './modules/district/district.service';
import { DistrictModule } from './modules/district/district.module';
import { WardModule } from './modules/ward/ward.module';
import { ProductTypeModule } from './modules/product-type/product-type.module';
import { SpecialFeatureModule } from './modules/special-feature/special-feature.module';
import { DesignModule } from './modules/design/design.module';
import { CameraModule } from './modules/camera/camera.module';
import { PinModule } from './modules/pin/pin.module';
import { ScreenModule } from './modules/screen/screen.module';
import { PromotionModule } from './modules/promotion/promotion.module';
import { CommentsModule } from './modules/comments/comments.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { OrdersModule } from './modules/orders/orders.module';
import { StripeModule } from './service/stripe/stripe.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { MessagesModule } from './modules/messages/messages.module';
import { SocketUserModule } from './modules/socket-user/socket-user.module';
import { ChatGateway } from './service/chat/chat.gateway';
import { ChatModule } from './service/chat/chat.module';

@Module({
  imports: [
    MulterModule.register({dest:"./images"}),
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(ormconfig), 
    UserModule, 
    CategoriesModule, 
    ProductsModule, 
    MailModule, 
    CustomerModule, 
    ProductImagesModule, 
    AuthModule, 
    ProductInformationModule, 
    ProvinceModule, 
    DistrictModule, 
    WardModule, 
    ProductTypeModule, 
    SpecialFeatureModule, 
    DesignModule, 
    CameraModule, 
    PinModule, 
    ScreenModule, 
    PromotionModule, 
    CommentsModule, 
    PaymentsModule, 
    OrdersModule, 
    StripeModule, ConversationsModule, MessagesModule, SocketUserModule, ChatModule],
    controllers: [AppController],
    providers: [AppService, ChatGateway],
})
export class AppModule {}
