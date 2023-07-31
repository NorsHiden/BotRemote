import { Module } from '@nestjs/common';
import { OauthModule } from './oauth/oauth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NecordModule } from 'necord';
import { IntentsBitField } from 'discord.js';
import { AppUpdate } from './updates/app.update';
import { VoiceChannelModule } from './voice_channel/voice_channel.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    NecordModule.forRoot({
      token: configService.get('DISCORD_CLIENT_TOKEN'),
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildVoiceStates,
      ],
      development: [configService.get('DISCORD_DEVELOPMENT_GUILD_ID')],
    }),
    ThrottlerModule.forRoot({
      ttl: 60, // seconds
      limit: 10, // requests
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: configService.get('DATABASE_URL'),
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    VoiceChannelModule,
    OauthModule,
  ],
  controllers: [],
  providers: [AppUpdate],
})
export class AppModule {}
