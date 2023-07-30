import { Song } from './Song';
import { User } from './User';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => User, (user) => user.playlist)
  @JoinColumn()
  author: string;

  @OneToMany(() => Song, (song) => song.playlist)
  songs: Song[];
}
