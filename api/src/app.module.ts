import { Module } from '@nestjs/common';
import { OauthModule } from './oauth/oauth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NecordModule } from 'necord';
import { IntentsBitField } from 'discord.js';
import { AppUpdate } from './updates/app.update';
import { VoiceChannelModule } from './voice_channel/voice_channel.module';
import { ThrottlerModule } from '@nestjs/throttler';

const configService = new ConfigService();

@Module({
  imports: [
    OauthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    NecordModule.forRoot({
      token: configService.get('DISCORD_CLIENT_SECRET'),
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
    VoiceChannelModule,
  ],
  controllers: [],
  providers: [AppUpdate],
})
export class AppModule {}
