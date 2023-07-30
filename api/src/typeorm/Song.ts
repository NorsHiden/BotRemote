import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Playlist } from './Playlist';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  duration: string;

  @Column()
  thumbnail: string;

  @Column()
  description: string;

  @ManyToOne(() => Playlist, (playlist) => playlist.songs)
  @JoinColumn()
  playlist: Playlist;
}
