import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cors());
  app.use(cookieParser());
  await app.listen(3000, () => {
    console.log('Listening at port 3000');
  });
}
bootstrap();
