import {
  AudioPlayer,
  VoiceConnection,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from '@discordjs/voice';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Client } from 'discord.js';
import player from 'play-dl';

@Injectable()
export class VoiceServices {
  private readonly guilds: Map<
    string,
    { voice: VoiceConnection; player: AudioPlayer }
  > = new Map();
  private readonly queue: Map<
    string,
    {
      id: number;
      url: string;
      thumbnail: string;
      title: string;
      author: string;
      duration: string;
      isPlaying: boolean;
    }[]
  > = new Map();
  constructor(private readonly client: Client) {}

  async join(guildId: string, channelId: string) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const channel = guild.channels.cache.get(channelId);
    if (!channel) throw new NotFoundException('Channel not found');
    const voice = await joinVoiceChannel({
      guildId: guildId,
      channelId: channelId,
      adapterCreator: guild.voiceAdapterCreator,
    });
    let connection = this.guilds.get(guildId);
    if (connection) connection.voice = voice;
    else connection = { voice: voice, player: createAudioPlayer() };
    this.guilds.set(guildId, connection);
    return true;
  }

  async leave(guildId: string, channelId: string) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const channel = guild.channels.cache.get(channelId);
    if (!channel) throw new NotFoundException('Channel not found');
    const connection = this.guilds.get(guildId);
    if (!connection) throw new NotFoundException('Connection not found');
    connection.voice.destroy();
    return true;
  }

  async getCurrentVoice(guildId: string) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const connection = this.guilds.get(guildId);
    return {
      guildId: guild.id,
      guildName: guild.name,
      channelId: connection?.voice.joinConfig.channelId,
      channelName: guild.channels.cache.get(
        connection?.voice.joinConfig.channelId,
      )?.name,
    };
  }

  async getQueue(guildId: string) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const queue = this.queue.get(guildId);
    if (!queue) return [];
    return queue;
  }

  async searchYoutube(prompt: string) {
    const search = await player.search(prompt, {
      source: { youtube: 'video' },
      limit: 10,
    });
    return search;
  }

  async addToQueue(guildId: string, url: string) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const result = await player.search(url, { source: { youtube: 'video' } });
    if (!result) throw new NotFoundException('URL not found');
    const queue = this.queue.get(guildId) || [];
    const song = {
      id: queue ? queue.length : 0,
      url: result[0].url,
      thumbnail: result[0].thumbnails[0].url,
      title: result[0].title,
      author: result[0].channel.name,
      duration: result[0].durationRaw,
      isPlaying: false,
    };
    queue.push(song);
    this.queue.set(guildId, queue);
    return song;
  }

  async removeFromQueue(guildId: string, id: string) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new NotFoundException('Guild not found');
    const queue = this.queue.get(guildId);
    if (!queue) return true;
    const song = queue.find((song) => song.id === +id);
    if (!song) return true;
    const index = queue.indexOf(song);
    queue.splice(index, 1);
    this.queue.set(guildId, queue);
    return true;
  }
}
