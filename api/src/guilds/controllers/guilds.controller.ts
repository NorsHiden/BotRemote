import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { GuildsService } from '../services/guilds.service';
import { JwtAuthGuard } from 'src/oauth/guards/jwt.guard';

@Controller('guild')
@UseGuards(JwtAuthGuard)
export class GuildsController {
  constructor(private readonly guildsService: GuildsService) {}

  @Get(':id')
  async getGuilds(@Param('id') id: string) {
    return this.guildsService.getGuild(id);
  }

  @Get(':id/allchannels')
  async getChannels(@Param('id') id: string) {
    return this.guildsService.getAllChannels(id);
  }

  @Get(':id/voice-channels')
  async getVoiceChannels(@Param('id') id: string) {
    return this.guildsService.getVoiceChannels(id);
  }
}
