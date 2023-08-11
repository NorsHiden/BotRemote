import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from 'src/oauth/guards/jwt.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('@me')
  async getMe(@Req() req) {
    const user = await this.userService.getMe(req.user.id);
    return user;
  }
}
