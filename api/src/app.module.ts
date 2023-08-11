import { Module } from '@nestjs/common';
import { OauthModule } from './oauth/oauth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NecordModule } from 'necord';
import { IntentsBitField } from 'discord.js';
import { AppUpdate } from './updates/app.update';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuildsModule } from './guilds/guilds.module';
import { VoicesModule } from './voices/voices.module';
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
    OauthModule,
    UserModule,
    GuildsModule,
    VoicesModule,
  ],
  controllers: [],
  providers: [AppUpdate],
})
export class AppModule {}
