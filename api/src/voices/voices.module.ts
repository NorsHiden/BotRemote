import { Module } from '@nestjs/common';
import { VoicesController } from './controller/voices.controller';
import { VoiceServices } from './services/voices.service';
import { GuildsConnectionService } from 'src/guilds/services/guildsconnection.service';
import { PlayerService } from './services/player.service';

@Module({
  controllers: [VoicesController],
  providers: [VoiceServices, PlayerService, GuildsConnectionService],
})
export class VoicesModule {}
