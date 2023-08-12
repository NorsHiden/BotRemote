import { createAudioPlayer, joinVoiceChannel } from '@discordjs/voice';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Client } from 'discord.js';
import {
  GuildConnection,
  GuildsConnectionService,
  createGuildConnection,
} from 'src/guilds/services/guildsconnection.service';
import player, { YouTubePlayList } from 'play-dl';

@Injectable()
export class VoiceServices {
  constructor(
    private readonly client: Client,
    private readonly guilds: GuildsConnectionService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    this.client.guilds.cache.forEach(async (guild) => {
      this.guilds.set(
        guild.id,
        createGuildConnection(guild.id) as GuildConnection,
      );
    });
    this.client.on('guildCreate', async (guild) => {
      this.guilds.set(
        guild.id,
        createGuildConnection(guild.id) as GuildConnection,
      );
    });
    this.client.on('guildDelete', async (guild) => {
      this.guilds.delete(guild.id);
    });
  }

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
    const localGuild = this.guilds.get(guildId);
    localGuild.voice = connection;
    connection.subscribe(localGuild.player);
    this.guilds.set(guildId, localGuild);
    return 'Joined voice channel';
  }

  async leaveVoice(guildId: string, channelId: string): Promise<string> {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    if (channelId != guild.voice?.joinConfig.channelId)
      return 'Not in the same voice channel';
    guild.voice?.destroy();
    guild.voice = null;
    this.guilds.set(guildId, guild);
    return 'Left voice channel';
  }

  async getCurrentVoice(guildId: string): Promise<string> {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    if (!guild.voice) return '';
    return guild.voice.joinConfig.channelId;
  }

  async searchYoutube(query: string): Promise<YouTubePlayList[]> {
    const videos = await player.search(query, {
      limit: 10,
      source: { youtube: 'video' },
    });
    return videos;
  }
}
