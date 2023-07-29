import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { VoiceChannelService } from '../services/voice_channel.service';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('voice-channel')
// @UseGuards(ThrottlerGuard)
export class VoiceChannelController {
  constructor(private readonly voiceChannelService: VoiceChannelService) {}

  @Get('join')
  async join(@Body() body: { guildId: string; channelId: string }) {
    await this.voiceChannelService.join(body.guildId, body.channelId);
    return {
      message: 'Joined Channel',
      statusCode: '200',
      data: {
        guildId: body.guildId,
        channelId: body.channelId,
      },
    };
  }

  @Get('leave')
  async leave(@Body() body: { guildId: string }) {
    await this.voiceChannelService.leave(body.guildId);
    return {
      message: 'Left Channel',
      statusCode: '200',
      data: {
        guildId: body.guildId,
      },
    };
  }

  @Get('play')
  async play(@Body() body: { guildId: string; url: string }) {
    await this.voiceChannelService.play(body.guildId, body.url);
    return {
      message: 'Playing',
      statusCode: '200',
      data: {
        guildId: body.guildId,
        url: body.url,
      },
    };
  }
}
