import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../typeorm/User';
import { UserDetails } from '../utils/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async validateUser(details: UserDetails) {
    let user = await this.userRepository.findOneBy({ userID: details.userID });
    if (user)
    {
      user.accessToken = details.accessToken;
      user.refreshToken = details.refreshToken;
      user.isLoggedIn = true;
      return this.userRepository.save(user);
    }
    const newUser = this.userRepository.create(details);
    return this.userRepository.save(newUser);
  }

  async findUser(id: string) {
    const user = await this.userRepository.findOneBy({ userID: id });
    return user;
  }
}