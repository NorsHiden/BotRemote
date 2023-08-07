import { Injectable, NotFoundException } from '@nestjs/common';
import { Client } from 'discord.js';
import { GuildsConnectionService } from 'src/guilds/services/guildsconnection.service';
import { Song } from 'src/guilds/services/guildsconnection.service';
import player from 'play-dl';
import { createAudioResource } from '@discordjs/voice';

@Injectable()
export class PlayerService {
  constructor(
    private readonly client: Client,
    private readonly guilds: GuildsConnectionService,
  ) {}

  async play(guildId: string): Promise<Song> {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    if (!guild.queue.length) throw new NotFoundException('Queue is empty');
    if (guild.player.state.status === 'paused') {
      guild.player.unpause();
      const song = guild.queue.findIndex(
        (song: Song) => song.state === 'PAUSED',
      );
      guild.queue[song].state = 'PLAYING';
      this.guilds.set(guildId, guild);
      return guild.queue[song];
    }
    const stream = await player.stream(guild.queue[0].url, {
      discordPlayerCompatibility: true,
      quality: 3,
    });
    const resource = createAudioResource(stream.stream, {
      inputType: stream.type,
    });
    guild.player.play(resource);
    guild.queue[guild.selectedSong].state = 'PLAYING';
    this.guilds.set(guildId, guild);
    guild.player.on('error', (error) => {
      console.error(error);
    });
    guild.player.on('stateChange', (oldState, newState) => {
      if (newState.status === 'idle') {
        guild.queue[guild.selectedSong].state = 'STOPPED';
        if (guild.selectedSong === guild.queue.length - 1) guild.selectedSong++;
        else if (guild.isLooping) guild.selectedSong = 0;
      }
    });
  }

  async pause(guildId: string): Promise<Song> {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    if (!guild.queue.length) throw new NotFoundException('Queue is empty');
    guild.player.pause();
    guild.queue[0].isPlaying = false;
    this.guilds.set(guildId, guild);
    return guild.queue[0];
  }
}
