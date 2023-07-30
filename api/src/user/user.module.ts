import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { JwtAuthGuard } from 'src/oauth/guards/jwt.guard';
import { User } from 'src/typeorm/User';
import { Playlist } from 'src/typeorm/Playlist';
import { Song } from 'src/typeorm/Song';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/oauth/strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User, Playlist, Song])],
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard, JwtStrategy],
})
export class UserModule {}
