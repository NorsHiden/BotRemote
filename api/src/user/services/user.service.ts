import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { User } from 'src/typeorm/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async getMe(id: string) {
    const user = await this.userRepository.findOneBy({ id: id });
    let userdata = {};
    if (!user) throw new NotFoundException('User not found');
    const res = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    });
    userdata = res.data;
    return userdata;
  }
}
