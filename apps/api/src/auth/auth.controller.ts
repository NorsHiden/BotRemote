import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { DiscordAuthGuard } from "./auth.guard";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../typeorm/User';

@Controller('auth')
export class AuthController {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
      ) {}
    
    @Get('login')
    @UseGuards(DiscordAuthGuard)
    async handleLogin(@Req() request) {
        if (!request.user)
            return {
                statusCode: 401,
                mgs: "Unauthorized."
            };
        const user = await this.userRepository.findOneBy({ userID: request.user.userID });
        return {
            statusCode: 200,
            mgs: "logged In!"
        };
    }

    @Get('logout')
    async handleLogout(@Req() request) {
        if (!request.user)
            return {
                statusCode: 401,
                mgs: "Unauthorized."
            };
        let user = await this.userRepository.findOneBy({ userID: request.user.userID });
        user.isLoggedIn = false;
        await this.userRepository.save(user);
        request.session.destroy();
        return {
            statusCode: 200,
            mgs: "logged Out!"
        };
    }

    @Get('redirect')
    @UseGuards(DiscordAuthGuard)
    handleRedirect(@Req() request, @Res() res) {
        if (request.user)
            res.redirect("http://localhost:5173/home");
        return {
            statusCode: 401,
            mgs: "Unauthorized."
        };
    }
}