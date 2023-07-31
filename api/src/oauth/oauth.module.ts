import { Module } from '@nestjs/common';
import { OAuthService } from './services/oauth.service';
import { OauthController } from './controllers/oauth.controller';
import { DiscordAuthGuard } from './guards/oauth.guard';
import { DiscordStrategy } from './strategies/discord.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { Playlist } from 'src/typeorm/Playlist';
import { Song } from 'src/typeorm/Song';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

const configService = new ConfigService();

@Module({
  imports: [
    JwtModule.register({
      secret: configService.get('JWT_SECRET'),
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [OauthController],
  providers: [
    DiscordAuthGuard,
    DiscordStrategy,
    JwtAuthGuard,
    JwtStrategy,
    OAuthService,
  ],
  exports: [OAuthService],
})
export class OauthModule {}
