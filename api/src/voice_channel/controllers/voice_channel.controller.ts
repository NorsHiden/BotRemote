import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { VoiceChannelService } from '../services/voice_channel.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import { JwtAuthGuard } from 'src/oauth/guards/jwt.guard';

@Controller('voice-channel')
// @UseGuards(ThrottlerGuard)
@UseGuards(JwtAuthGuard)
export class VoiceChannelController {
  constructor(private readonly voiceChannelService: VoiceChannelService) {}

  @Post('join')
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

  @Post('leave')
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

  @Post('play')
  async play(@Body() body: { guildId: string }) {
    await this.voiceChannelService.play(body.guildId);
    return {
      message: 'Playing',
      statusCode: '200',
      data: {
        guildId: body.guildId,
      },
    };
  }

  @Post('pause')
  async pause(@Body() body: { guildId: string }) {
    await this.voiceChannelService.pause(body.guildId);
    return {
      message: 'Paused',
      statusCode: '200',
      data: {
        guildId: body.guildId,
      },
    };
  }

  @Post('resume')
  async resume(@Body() body: { guildId: string }) {
    await this.voiceChannelService.resume(body.guildId);
    return {
      message: 'Resumed',
      statusCode: '200',
      data: {
        guildId: body.guildId,
      },
    };
  }

  @Post('add')
  async add(@Body() body: { guildId: string; url: string }) {
    const song = await this.voiceChannelService.add(body.guildId, body.url);
    return {
      message: 'Added to playlist',
      statusCode: '200',
      data: {
        guildId: body.guildId,
        url: body.url,
        song: song,
      },
    };
  }

  @Post('playlist')
  async playlist(@Body() body: { guildId: string }) {
    const playlist = await this.voiceChannelService.playlist(body.guildId);
    return {
      message: 'Playlist',
      statusCode: '200',
      data: {
        guildId: body.guildId,
        playlist: playlist,
      },
    };
  }

  @Post('skip')
  async skip(@Body() body: { guildId: string }) {
    await this.voiceChannelService.skip(body.guildId);
    return {
      message: 'Skipped',
      statusCode: '200',
      data: {
        guildId: body.guildId,
      },
    };
  }

  @Post('stop')
  async stop(@Body() body: { guildId: string }) {
    await this.voiceChannelService.stop(body.guildId);
    return {
      message: 'Stopped',
      statusCode: '200',
      data: {
        guildId: body.guildId,
      },
    };
  }

  @Post('volume')
  async volume(@Body() body: { guildId: string; volume: number }) {
    await this.voiceChannelService.volume(body.guildId, body.volume);
    return {
      message: 'Volume Changed',
      statusCode: '200',
      data: {
        guildId: body.guildId,
        volume: body.volume,
      },
    };
  }

  @Post('prev')
  async prev(@Body() body: { guildId: string }) {
    await this.voiceChannelService.previous(body.guildId);
    return {
      message: 'Previous Song',
      statusCode: '200',
      data: {
        guildId: body.guildId,
      },
    };
  }
}
