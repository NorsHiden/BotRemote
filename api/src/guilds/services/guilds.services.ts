import { Injectable } from '@nestjs/common';
import { ChannelType, Client } from 'discord.js';

@Injectable()
export class GuildsService {
  constructor(private readonly client: Client) {}

  async getGuilds(userId: string) {
    const guilds = await this.client.guilds.cache;
    const userGuilds = [];
    guilds.map((guild) => {
      const members = guild.members.cache;
      members.filter((member) => member.id === userId);
      if (members.size > 0) userGuilds.push(guild);
    });
    return userGuilds;
  }

  async getGuild(id: string) {
    return await this.client.guilds.cache.get(id);
  }

  async getGuildChannels(guildId: string) {
    const guild = await this.client.guilds.cache.get(guildId);
    return guild.channels.cache;
  }

  async getGuildVoices(guildId: string) {
    const guild = await this.client.guilds.cache.get(guildId);
    return guild.channels.cache.filter(
      (channel) => channel.type === ChannelType.GuildVoice,
    );
  }
}
