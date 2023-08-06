import { Module } from '@nestjs/common';
import { VoicesController } from './controller/voices.controller';
import { VoiceServices } from './services/voices.services';

@Module({
  controllers: [VoicesController],
  providers: [VoiceServices],
})
export class VoicesModule {}
