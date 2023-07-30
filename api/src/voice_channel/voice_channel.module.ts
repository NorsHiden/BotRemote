import { Module } from '@nestjs/common';
import { VoiceChannelService } from './services/voice_channel.service';
import { VoiceChannelController } from './controllers/voice_channel.controller';
import { GuildsParamsService } from 'src/guilds/guilds_params.service';
import { JwtAuthGuard } from 'src/oauth/guards/jwt.guard';
import { JwtStrategy } from 'src/oauth/strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'discord.js';
import { Playlist } from 'src/typeorm/Playlist';
import { Song } from 'src/typeorm/Song';

@Module({
  imports: [TypeOrmModule.forFeature([User, Playlist, Song])],
  controllers: [VoiceChannelController],
  providers: [
    VoiceChannelService,
    GuildsParamsService,
    JwtAuthGuard,
    JwtStrategy,
  ],
})
export class VoiceChannelModule {}
