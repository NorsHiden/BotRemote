import { Module } from '@nestjs/common';
import { VoicesController } from './controller/voices.controller';
import { VoiceServices } from './services/voices.service';
import { GuildsConnectionService } from 'src/guilds/services/guildsconnection.service';

@Module({
  controllers: [VoicesController],
  providers: [VoiceServices, GuildsConnectionService],
})
export class VoicesModule {}
