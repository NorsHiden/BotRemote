import {
  AudioPlayer,
  AudioPlayerStatus,
  VoiceConnection,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from '@discordjs/voice';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Client } from 'discord.js';
import player from 'play-dl';
import { GuildsParamsService } from 'src/guilds/guilds_params.service';

@Injectable()
export class VoiceChannelService {
  constructor(
    private readonly client: Client,
    private readonly guilds: GuildsParamsService,
  ) {}

  async join(guildId: string, channelId: string) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) throw new BadRequestException('Guild not found');
    const channel = guild.channels.cache.get(channelId);
    if (!channel) throw new BadRequestException('Channel not found');
    const voice = joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
    });
    const player = createAudioPlayer();
    voice.subscribe(player);
    this.guilds.set(guildId, {
      guild,
      channel,
      player,
      voice,
      playlist: [],
      currentSong: 0,
    });
  }

  async leave(guildId: string) {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new BadRequestException('Bot not in channel');
    guild.voice.destroy();
    this.guilds.delete(guildId);
  }

  async play(guildId: string) {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new BadRequestException('Bot not in channel');
    if (
      guild.playlist.length === 0 ||
      guild.currentSong >= guild.playlist.length
    )
      throw new BadRequestException('Playlist is empty');
    const url = guild.playlist[guild.currentSong].url;

    const stream = await player.stream(url, {
      discordPlayerCompatibility: true,
    });
    const resource = createAudioResource(stream.stream);
    guild.player.play(resource);
    guild.player.on(AudioPlayerStatus.Idle, () => {
      guild.playlist.shift();
      if (guild.playlist.length > 0) {
        this.play(guildId);
      }
    });
  }

  async add(guildId: string, url: string) {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new BadRequestException('Bot not in channel');
    let info;
    try {
      info = await player.video_info(url);
    } catch (e) {
      throw new BadRequestException('Invalid url');
    }
    const song = {
      id: guild.playlist.length,
      url: info.video_details.url,
      title: info.video_details.title,
    };
    guild.playlist.push(song);
    return song;
  }

  async playlist(guildId: string) {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new BadRequestException('Bot not in channel');
    return guild.playlist;
  }

  async skip(guildId: string) {
    const guild = this.guilds.get(guildId);
    if (!guild) throw new BadRequestException('Bot not in channel');
    guild.player.stop();
    if (guild.playlist.length > guild.currentSong + 1) {
      guild.currentSong++;
      this.play(guildId);
    }
    return guild.playlist[guild.currentSong];
  }
}
