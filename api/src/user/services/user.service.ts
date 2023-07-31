import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Client } from 'discord.js';
import { User } from 'src/typeorm/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly client: Client,
  ) {}
  async getGuilds(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new BadRequestException('User not found');
    try {
      const guilds = await axios.get(
        'https://discord.com/api/v10/users/@me/guilds',
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        },
      );
      return guilds.data;
    } catch (err) {
      throw new BadRequestException(err.response.data.message);
    }
  }

  async getCommonGuilds(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new BadRequestException('User not found');
    try {
      const guilds = await axios.get(
        'https://discord.com/api/v10/users/@me/guilds',
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        },
      );
      let commonGuilds = [];
      this.client.guilds.cache.forEach((guild) => {
        guilds.data.forEach((guildData) => {
          if (guild.id === guildData.id) {
            commonGuilds.push(guild);
          }
        });
      });
      return commonGuilds;
      // return guilds.data;
    } catch (err) {
      throw new BadRequestException(err.response.data.message);
    }
  }
}
