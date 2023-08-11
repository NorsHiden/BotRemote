import { Injectable, NotFoundException } from '@nestjs/common';
import { Client } from 'discord.js';
import {
  GuildConnection,
  GuildsConnectionService,
  createGuildConnection,
} from 'src/guilds/services/guildsconnection.service';
import { Song } from 'src/guilds/services/guildsconnection.service';
import player from 'play-dl';
import { createAudioResource } from '@discordjs/voice';

@Injectable()
export class PlayerService {
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
      this.guilds.get(guild.id).player.on('error', (error) => {
        console.error(error);
      });
      this.guilds
        .get(guild.id)
        .player.on('stateChange', (oldState, newState) => {
          const currentGuild = this.guilds.get(guild.id);
          if (
            newState.status === 'idle' &&
            currentGuild.queue[currentGuild.selectedSong].state == 'PLAYING'
          )
            this.skip(guild.id);
        });
    });

    this.client.on('guildCreate', async (guild) => {
      this.guilds.set(
        guild.id,
        createGuildConnection(guild.id) as GuildConnection,
      );
      this.guilds.get(guild.id).player.on('error', (error) => {
        console.error(error);
      });
      this.guilds
        .get(guild.id)
        .player.on('stateChange', (oldState, newState) => {
          const currentGuild = this.guilds.get(guild.id);
          if (
            newState.status === 'idle' &&
            currentGuild.queue[currentGuild.selectedSong].state == 'PLAYING'
          )
            this.skip(guild.id);
        });
    });
    this.client.on('guildDelete', async (guild) => {
      this.guilds.delete(guild.id);
    });
  }

  async addSong(
    guildId: string,
    url: string,
    requester: string,
  ): Promise<Song> {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const songInfo = await player.video_info(url);
    const song: Song = {
      url: url,
      title: songInfo.video_details.title,
      views: songInfo.video_details.views,
      artist: songInfo.video_details.channel.name,
      thumbnail: songInfo.video_details.thumbnails[0].url,
      duration_sec: songInfo.video_details.durationInSec,
      duration: songInfo.video_details.durationRaw,
      requester: requester,
      seek: 0,
      state: 'STOPPED',
    };
    guild.queue.push(song);
    this.guilds.set(guildId, guild);
    return song;
  }

  async removeSong(guildId: string, index: number): Promise<Song> {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    if (!guild.queue.length) throw new NotFoundException('Queue is empty');
    const song = guild.queue[index];
    if (!song) throw new NotFoundException('Song not found');
    if (song.state === 'PLAYING' || song.state === 'PAUSED')
      await this.stop(guildId);
    if (guild.queue.length == 2) guild.selectedSong = 0;
    guild.queue.splice(index, 1);
    this.guilds.set(guildId, guild);
    return song;
  }

  async clearQueue(guildId: string): Promise<Song[]> {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    if (!guild.queue.length) throw new NotFoundException('Queue is empty');
    const queue = guild.queue;
    guild.queue = [];
    this.guilds.set(guildId, guild);
    return queue;
  }

  async getQueue(guildId: string): Promise<Song[]> {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    return guild.queue;
  }

  async play(guildId: string): Promise<Song> {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    if (!guild.queue.length) throw new NotFoundException('Queue is empty');
    if (guild.queue[guild.selectedSong].state === 'PAUSED') {
      guild.player.unpause();
      guild.queue[guild.selectedSong].state = 'PLAYING';
      this.guilds.set(guildId, guild);
      return guild.queue[guild.selectedSong];
    }
    const stream = await player.stream(guild.queue[guild.selectedSong].url, {
      discordPlayerCompatibility: true,
      quality: 3,
    });
    const resource = createAudioResource(stream.stream, {
      inputType: stream.type,
      inlineVolume: true,
    });
    guild.player.play(resource);
    if (guild.queue[guild.selectedSong])
      guild.queue[guild.selectedSong].state = 'PLAYING';
    else {
      console.log(guild.queue, guild.selectedSong);
    }
    this.guilds.set(guildId, guild);
  }

  async pause(guildId: string): Promise<Song> {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    if (!guild.queue.length) throw new NotFoundException('Queue is empty');
    guild.player.pause();
    guild.queue[guild.selectedSong].state = 'PAUSED';
    this.guilds.set(guildId, guild);
    return guild.queue[guild.selectedSong];
  }

  async stop(guildId: string): Promise<Song> {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    if (!guild.queue.length) throw new NotFoundException('Queue is empty');
    guild.player.stop();
    guild.queue[guild.selectedSong].state = 'STOPPED';
    this.guilds.set(guildId, guild);
    return guild.queue[guild.selectedSong];
  }

  async skip(guildId: string): Promise<Song> {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    if (!guild.queue.length) throw new NotFoundException('Queue is empty');
    guild.queue[guild.selectedSong].state = 'STOPPED';
    if (guild.selectedSong < guild.queue.length - 1) guild.selectedSong++;
    else if (guild.isLooping) guild.selectedSong = 0;
    this.guilds.set(guildId, guild);
    return this.play(guildId);
  }

  async previous(guildId: string): Promise<Song> {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    if (!guild.queue.length) throw new NotFoundException('Queue is empty');
    guild.queue[guild.selectedSong].state = 'STOPPED';
    if (guild.selectedSong > 0) guild.selectedSong--;
    this.guilds.set(guildId, guild);
    return this.play(guildId);
  }

  async loop(guildId: string): Promise<boolean> {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    if (!guild.queue.length) throw new NotFoundException('Queue is empty');
    guild.isLooping = !guild.isLooping;
    this.guilds.set(guildId, guild);
    return guild.isLooping;
  }

  async shuffle(guildId: string): Promise<Song[]> {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    if (!guild.queue.length) throw new NotFoundException('Queue is empty');
    guild.queue = guild.queue.sort(() => Math.random() - 0.5);
    guild.selectedSong = guild.queue.findIndex(
      (song) => song.state === 'PLAYING',
    );
    if (guild.selectedSong === -1) guild.selectedSong = 0;
    this.guilds.set(guildId, guild);
    return guild.queue;
  }

  async seek(guildId: string, time: number): Promise<Song> {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    if (!guild.queue.length) throw new NotFoundException('Queue is empty');
    guild.player.stop();
    guild.queue[guild.selectedSong].state = 'STOPPED';
    guild.queue[guild.selectedSong].seek = time;
    this.guilds.set(guildId, guild);
    return this.play(guildId);
  }

  getUpdates(guildId: string) {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    return {
      currentPlaying:
        guild.selectedSong < guild.queue.length
          ? guild.queue[guild.selectedSong]
          : ({} as Song),
      isLooping: guild.isLooping,
      queue: guild.queue ? guild.queue : [],
    };
  }
}
