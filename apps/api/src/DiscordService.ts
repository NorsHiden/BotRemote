import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Repository } from 'typeorm';
import { User } from './typeorm/User';

@Injectable()
export class DiscordService {

  async getUserGuilds(user: User, userRepo: Repository<User>): Promise<any> {
    let accessToken = await this.getAccessTokenFromStorage(user, userRepo);

    try {
      const response = await axios.get('https://discord.com/api/users/@me/guilds', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        // Access token has expired, try to refresh it
        accessToken = await this.refreshAccessToken(user, userRepo);
        // Retry the request with the new access token
        return this.getUserGuilds(user, userRepo);
      } else {
        throw error;
      }
    }
  }

  private async getAccessTokenFromStorage(user: User, userRepo: Repository<User>): Promise<string> {
    const userData = await userRepo.findOneBy({ userID: user.userID });
    return userData.accessToken;
  }

  private async refreshAccessToken(user: User, userRepo: Repository<User>): Promise<string> {
    let userData = await userRepo.findOneBy({ userID: user.userID });
    const response = await axios.post('https://discord.com/api/oauth2/token', {
        clientID: '1123389644764090538',
        clientSecret: 'i6AJ3Hc_Up8Yo_gi8VGeScfQaMJhURSW',
        grant_type: 'refresh_token',
        refresh_token: userData.refreshToken,
    });

    // Store the new access token and refresh token
    userData.accessToken = response.data.access_token;
    await userRepo.save(userData);

    // Return the new access token
    return userData.accessToken;
  }
}