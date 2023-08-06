import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Sse,
} from '@nestjs/common';
import { VoiceServices } from '../services/voices.services';
import { Observable, interval, map } from 'rxjs';

type MessageEvent = {
  data: {
    hello: string;
  };
};

@Controller('voices')
export class VoicesController {
  constructor(private readonly voicesservice: VoiceServices) {}

  @Post(':guildId/:channelId/join')
  async joinChannel(
    @Param('guildId') guildId: string,
    @Param('channelId') channelId: string,
  ) {
    return await this.voicesservice.join(guildId, channelId);
  }

  @Post(':guildId/:channelId/leave')
  async leaveChannel(
    @Param('guildId') guildId: string,
    @Param('channelId') channelId: string,
  ) {
    return await this.voicesservice.leave(guildId, channelId);
  }

  @Get(':guildId/current-voice')
  async getCurrentVoice(@Param('guildId') guildId: string) {
    return await this.voicesservice.getCurrentVoice(guildId);
  }

  @Get('yt-search')
  async searchYoutube(@Query('prompt') prompt: string) {
    if (!prompt) throw new NotFoundException('Prompt not found');
    return await this.voicesservice.searchYoutube(prompt);
  }

  @Get(':guildId/queue')
  async getQueue(@Param('guildId') guildId: string) {
    return await this.voicesservice.getQueue(guildId);
  }

  @Post(':guildId/queue')
  async add(@Param('guildId') guildId: string, @Query('url') url: string) {
    return await this.voicesservice.addToQueue(guildId, url);
  }

  @Delete(':guildId/queue')
  async remove(@Param('guildId') guildId: string, @Query('id') id: string) {
    return await this.voicesservice.removeFromQueue(guildId, id);
  }

  @Sse('event')
  sseEvent(): Observable<MessageEvent> {
    return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
  }
}
