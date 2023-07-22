import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { OAuthService } from '../services/oauth.service';
import { DiscordAuthGuard } from '../guards/oauth.guard';

@Controller('oauth')
export class OauthController {
  constructor(private readonly OAuthService: OAuthService) {}

  @Get()
  @UseGuards(DiscordAuthGuard)
  oauthLogin() {}

  @Get('redirect')
  @UseGuards(DiscordAuthGuard)
  oauthRedirect() {}
}
