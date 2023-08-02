import { Injectable } from '@nestjs/common';
import { ChannelType, Client, Guild } from 'discord.js';

@Injectable()
export class GuildsService {
  constructor(private readonly client: Client) {}

  async getGuild(guildId: string) {
    const guild = await this.client.guilds.cache.get(guildId);
    return guild;
  }

  async getAllChannels(guildId: string) {
    const guild = await this.client.guilds.cache.get(guildId);
    const channels = await guild.channels.cache;
    return channels;
  }

  async getVoiceChannels(guildId: string) {
    const guild = await this.client.guilds.cache.get(guildId);
    const channels = await guild.channels.cache.filter(
      (channel) => channel.type === ChannelType.GuildVoice,
    );
    return channels;
  }
}
