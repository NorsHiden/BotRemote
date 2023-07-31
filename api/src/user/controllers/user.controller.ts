import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from 'src/oauth/guards/jwt.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('guilds')
  async getGuilds(@Req() req) {
    const guilds = await this.userService.getGuilds(req.user.id);
    return guilds;
  }

  @Get('common-guilds')
  async getCommonGuilds(@Req() req) {
    const guilds = await this.userService.getCommonGuilds(req.user.id);
    return guilds;
  }
}
