import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { GuildsService } from '../services/guilds.service';
import { JwtAuthGuard } from 'src/oauth/guards/jwt.guard';

@Controller('guilds')
@UseGuards(JwtAuthGuard)
export class GuildsController {
  constructor(private readonly guildsService: GuildsService) {}
  @Get()
  async getGuilds(@Req() req) {
    return this.guildsService.getGuilds(req.user.id);
  }

  @Get(':id')
  async getGuild(@Param('id') id: string) {
    return this.guildsService.getGuild(id);
  }

  @Get(':id/channels')
  async getGuildChannels(@Param('id') guildId: string) {
    return this.guildsService.getGuildChannels(guildId);
  }

  @Get(':id/voices')
  async getGuildVoices(@Param('id') guildId: string) {
    return this.guildsService.getGuildVoices(guildId);
  }
}
