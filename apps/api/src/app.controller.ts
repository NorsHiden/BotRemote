import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './typeorm/User';
import { DiscordService } from "./DiscordService";

@Controller()
export class appController {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly DiscordService: DiscordService
      ) {}

    @Get('guilds')
    async status(@Req() request) {
        if (!request.user)
            return {
                statusCode: 401,
                mgs: "Unauthorized."
            };
        const guilds = await this.DiscordService.getUserGuilds(request.user, this.userRepository);
        return guilds;
    }
}