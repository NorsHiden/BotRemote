import { createAudioPlayer, joinVoiceChannel } from '@discordjs/voice';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Client } from 'discord.js';
import player from 'play-dl';
import {
  GuildConnection,
  GuildsConnectionService,
} from 'src/guilds/services/guildsconnection.service';

@Injectable()
export class VoiceServices {
  constructor(
    private readonly client: Client,
    private readonly guilds: GuildsConnectionService,
  ) {}

  async joinVoice(guildId: string, channelId: string): Promise<string> {
    const guild = await this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const channel = await guild.channels.cache.get(channelId);
    if (!channel) throw new NotFoundException('Channel not found');
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
    });
    this.guilds.set(guildId, {
      id: guildId,
      voice: connection,
      player: createAudioPlayer(),
      queue: [],
    } as GuildConnection);
    connection.subscribe(this.guilds.get(guildId).player);
    return 'Joined voice channel';
  }

  async leaveVoice(guildId: string): Promise<string> {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    guild.voice?.destroy();
    guild.voice = null;
    this.guilds.set(guildId, guild);
    return 'Left voice channel';
  }
}
