import { Module } from '@nestjs/common';
import { OauthModule } from './oauth/oauth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    OauthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
