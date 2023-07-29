import {
  AudioPlayer,
  VoiceConnection,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from '@discordjs/voice';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Client } from 'discord.js';
import player from 'play-dl';
import { GuildsParamsService } from 'src/guilds/guilds_params.service';

@Injectable()
export class VoiceChannelService {
  constructor(
    private readonly client: Client,
    private readonly guilds: GuildsParamsService,
  ) {}

  async join(guildId: string, channelId: string) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new BadRequestException('Guild not found');
    const channel = guild.channels.cache.get(channelId);
    if (!channel) throw new BadRequestException('Channel not found');
    const voice = joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
    });
    const player = createAudioPlayer();
    voice.subscribe(player);
    this.guilds.set(guildId, { guild, channel, player, voice });
  }

  async leave(guildId: string) {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new BadRequestException('Bot not in channel');
    guild.voice.destroy();
    this.guilds.delete(guildId);
  }

  async play(guildId: string, url: string) {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new BadRequestException('Bot not in channel');

    const stream = await player.stream(url, {
      discordPlayerCompatibility: true,
    });
    const resource = createAudioResource(stream.stream);
    guild.player.play(resource);
  }
}
