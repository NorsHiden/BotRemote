import { Injectable } from '@nestjs/common';
import {
  ChannelType,
  Client,
  Collection,
  Guild,
  GuildBasedChannel,
} from 'discord.js';
import {
  GuildConnection,
  GuildsConnectionService,
  createGuildConnection,
} from './guildsconnection.service';

@Injectable()
export class GuildsService {
  constructor(
    private readonly client: Client,
    private readonly guilds: GuildsConnectionService,
  ) {}

  async onModuleInit(): Promise<void> {
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

  async getGuilds(userId: string): Promise<Guild[]> {
    const guilds = await this.client.guilds.cache;
    const userGuilds = [];
    guilds.map((guild) => {
      const members = guild.members.cache;
      members.filter((member) => member.id === userId);
      if (members.size > 0) userGuilds.push(guild);
    });
    return userGuilds;
  }

  async getGuild(id: string): Promise<Guild> {
    return await this.client.guilds.cache.get(id);
  }

  async getGuildChannels(
    guildId: string,
  ): Promise<Collection<string, GuildBasedChannel>> {
    const guild = await this.client.guilds.cache.get(guildId);
    return guild.channels.cache;
  }

  async getGuildVoices(
    guildId: string,
  ): Promise<Collection<string, GuildBasedChannel>> {
    const guild = await this.client.guilds.cache.get(guildId);
    return guild.channels.cache.filter(
      (channel) => channel.type === ChannelType.GuildVoice,
    );
  }
}
