import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { VoiceServices } from '../services/voices.service';
import { Observable, interval, map } from 'rxjs';
import { JwtAuthGuard } from 'src/oauth/guards/jwt.guard';
import { PlayerService } from '../services/player.service';
import { Song } from 'src/guilds/services/guildsconnection.service';

type MessageEvent = {
  data: {
    currentPlaying: Song;
    isLooping: boolean;
    queue: Song[];
  };
};

@Controller('voices')
@UseGuards(JwtAuthGuard)
export class VoicesController {
  constructor(
    private readonly voiceService: VoiceServices,
    private readonly playerService: PlayerService,
  ) {}

  @Post(':guildId/:channelId/join')
  async joinChannel(
    @Param('guildId') guildId: string,
    @Param('channelId') channelId: string,
  ) {
    return await this.voiceService.joinVoice(guildId, channelId);
  }

  @Post(':guildId/:channelId/leave')
  async leaveChannel(
    @Param('guildId') guildId: string,
    @Param('channelId') channelId: string,
  ) {
    return await this.voiceService.leaveVoice(guildId, channelId);
  }

  @Get(':guildId/current-voice')
  async getCurrentVoice(@Param('guildId') guildId: string) {
    return await this.voiceService.getCurrentVoice(guildId);
  }

  @Get('yt-search')
  async searchYoutube(@Query('prompt') prompt: string) {
    if (!prompt) throw new NotFoundException('Prompt not found');
    return await this.voiceService.searchYoutube(prompt);
  }

  @Get(':guildId/queue')
  async getQueue(@Param('guildId') guildId: string) {
    return await this.playerService.getQueue(guildId);
  }

  @Post(':guildId/queue')
  async add(
    @Req() req,
    @Param('guildId') guildId: string,
    @Query('url') url: string,
  ) {
    return await this.playerService.addSong(guildId, url, req.user.id);
  }

  @Delete(':guildId/queue')
  async remove(
    @Param('guildId') guildId: string,
    @Query('index') index: string,
  ) {
    return await this.playerService.removeSong(guildId, +index);
  }

  @Post(':guildId/play')
  async play(@Param('guildId') guildId: string) {
    return await this.playerService.play(guildId);
  }

  @Post(':guildId/pause')
  async pause(@Param('guildId') guildId: string) {
    return await this.playerService.pause(guildId);
  }

  @Post(':guildId/stop')
  async stop(@Param('guildId') guildId: string) {
    return await this.playerService.stop(guildId);
  }

  @Post(':guildId/skip')
  async skip(@Param('guildId') guildId: string) {
    return await this.playerService.skip(guildId);
  }

  @Post(':guildId/loop')
  async loop(@Param('guildId') guildId: string) {
    return await this.playerService.loop(guildId);
  }

  @Post(':guildId/shuffle')
  async shuffle(@Param('guildId') guildId: string) {
    return await this.playerService.shuffle(guildId);
  }

  @Sse(':guildId/updates')
  sseEvent(@Param('guildId') guildId): Observable<MessageEvent> {
    return interval(300).pipe(
      map((_) => ({
        data: this.playerService.getUpdates(guildId),
      })),
    );
  }
}
