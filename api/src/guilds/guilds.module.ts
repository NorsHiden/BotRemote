import { Module } from '@nestjs/common';
import { GuildsController } from './controllers/guilds.controller';
import { GuildsService } from './services/guilds.services';

@Module({
  imports: [],
  controllers: [GuildsController],
  providers: [GuildsService],
})
export class GuildsModule {}
