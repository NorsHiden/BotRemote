import { AudioPlayer, AudioResource, VoiceConnection } from '@discordjs/voice';
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
      playlist: { id: number; url: string; title: string }[];
      currentSong: number;
      currentPlaying: AudioResource;
    }
  > = new Map();
  constructor() {}

  get(guildId: string) {
    return this.guilds.get(guildId);
  }

  set(
    guildId: string,
    { guild, channel, player, voice, playlist, currentSong, currentPlaying },
  ) {
    this.guilds.set(guildId, {
      guild,
      channel,
      player,
      voice,
      playlist,
      currentSong,
      currentPlaying,
    });
  }

  delete(guildId: string) {
    this.guilds.delete(guildId);
  }
}
