import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { OAuthService } from '../services/oauth.service';
import { DiscordAuthGuard } from '../guards/oauth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('oauth')
export class OauthController {
  constructor(
    private readonly OAuthService: OAuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @UseGuards(DiscordAuthGuard)
  oauthLogin() {}

  @Get('redirect')
  @UseGuards(DiscordAuthGuard)
  async oauthRedirect(@Req() req, @Res() res) {
    const access_token = await this.OAuthService.signIn(req.user);
    res.cookie('access_token', access_token);
    res.redirect(this.configService.get('CLIENT_URL'));
  }
}
