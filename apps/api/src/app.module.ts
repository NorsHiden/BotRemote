import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DiscordService } from "./DiscordService";
import { appController } from "./app.controller";
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth/auth.service";
import { User } from "./typeorm/User";
import { DiscordStrategy } from "./auth/DiscordStrategy";
import { DiscordAuthGuard } from "./auth/auth.guard";
import { SessionSerializer } from './auth/Serializer';
import { AuthController } from "./auth/auth.controller";


@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'testuser',
        password: 'testuser123',
        database: 'discord_oauth',
        entities: [User],
        synchronize: true,
      }),
      PassportModule.register({ session: true })
  ],
  controllers: [ appController, AuthController ],
  providers: [
    DiscordService,
    DiscordStrategy,
    SessionSerializer,
    DiscordAuthGuard,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    }]
})
export class AppModule {}
