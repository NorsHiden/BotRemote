import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Playlist } from './Playlist';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  access_token: string;

  @Column()
  refresh_token: string;

  @OneToMany(() => Playlist, (playlist) => playlist.author)
  playlist: Playlist[];
}
