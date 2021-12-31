import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { useContainer } from 'typeorm';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  var serviceAccount = require("../EcommercenestjsFirebase.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: configService.get('FIREBASE_DATABASE_URL')
  });
  await app.listen(3000);
}
bootstrap();