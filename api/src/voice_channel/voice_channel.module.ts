import { Module } from '@nestjs/common';
import { VoiceChannelService } from './services/voice_channel.service';
import { VoiceChannelController } from './controllers/voice_channel.controller';
import { GuildsParamsService } from 'src/guilds/guilds_params.service';

@Module({
  imports: [],
  controllers: [VoiceChannelController],
  providers: [VoiceChannelService, GuildsParamsService],
})
export class VoiceChannelModule {}
