import { Module } from '@nestjs/common';
import { GuildsController } from './controllers/guilds.controller';
import { GuildsService } from './services/guilds.service';
import { GuildsConnectionService } from './services/guildsconnection.service';

@Module({
  imports: [],
  controllers: [GuildsController],
  providers: [GuildsService, GuildsConnectionService],
})
export class GuildsModule {}
