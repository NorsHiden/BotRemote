import { AudioPlayer, VoiceConnection } from '@discordjs/voice';
import { Injectable } from '@nestjs/common';

export type Song = {
  url: string;
  title: string;
  views: number;
  artist: string;
  thumbnail: string;
  duration: number;
  requester: string;
  state: 'PLAYING' | 'PAUSED' | 'STOPPED';
};

export type GuildConnection = {
  id: string;
  voice: VoiceConnection | null;
  player: AudioPlayer | null;
  queue: Song[];
  selectedSong: number;
  isLooping: boolean;
};

export const createGuildConnection = (id: string): GuildConnection =>
  ({
    id: id,
    selectedSong: 0,
    voice: null,
    player: null,
    queue: [],
    isLooping: false,
  } as GuildConnection);

@Injectable()
export class GuildsConnectionService {
  private readonly guilds: Map<string, GuildConnection>;

  constructor() {
    this.guilds = new Map<string, GuildConnection>();
  }

  get(id: string): GuildConnection | undefined {
    return this.guilds.get(id);
  }

  set(id: string, connection: GuildConnection): void {
    this.guilds.set(id, connection);
  }

  delete(id: string): void {
    this.guilds.delete(id);
  }

  has(id: string): boolean {
    return this.guilds.has(id);
  }

  clear(): void {
    this.guilds.clear();
  }

  get size(): number {
    return this.guilds.size;
  }
}
