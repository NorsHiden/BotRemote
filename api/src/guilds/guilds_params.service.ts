import { AudioPlayer, VoiceConnection } from '@discordjs/voice';
import { Injectable } from '@nestjs/common';
import { Guild, Channel } from 'discord.js';

@Injectable()
export class GuildsParamsService {
  private readonly guilds: Map<
    string,
    {
      guild: Guild;
      channel: Channel;
      player: AudioPlayer;
      voice: VoiceConnection;
    }
  > = new Map();
  constructor() {}

  get(guildId: string) {
    return this.guilds.get(guildId);
  }

  set(guildId: string, { guild, channel, player, voice }) {
    this.guilds.set(guildId, { guild, channel, player, voice });
  }

  delete(guildId: string) {
    this.guilds.delete(guildId);
  }
}
