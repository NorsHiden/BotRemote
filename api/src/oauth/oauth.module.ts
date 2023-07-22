import { Module } from '@nestjs/common';
import { OAuthService } from './services/oauth.service';
import { OauthController } from './controllers/oauth.controller';
import { DiscordAuthGuard } from './guards/oauth.guard';
import { DiscordStrategy } from './strategies/DiscordStrategy';

@Module({
  controllers: [OauthController],
  providers: [OAuthService, DiscordStrategy, DiscordAuthGuard],
})
export class OauthModule {}
