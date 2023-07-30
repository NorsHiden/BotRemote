import { Module } from '@nestjs/common';
import { OAuthService } from './services/oauth.service';
import { OauthController } from './controllers/oauth.controller';
import { DiscordAuthGuard } from './guards/oauth.guard';
import { DiscordStrategy } from './strategies/discord.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { Playlist } from 'src/typeorm/Playlist';
import { Song } from 'src/typeorm/Song';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User, Playlist, Song])],
  controllers: [OauthController],
  providers: [
    OAuthService,
    DiscordStrategy,
    DiscordAuthGuard,
    JwtService,
    JwtAuthGuard,
    JwtStrategy,
  ],
})
export class OauthModule {}
