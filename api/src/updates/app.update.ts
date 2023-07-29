import { Injectable, Logger } from '@nestjs/common';
import { Client } from 'discord.js';
import { Context, ContextOf, On, Once } from 'necord';

@Injectable()
export class AppUpdate {
  private readonly logger = new Logger(AppUpdate.name);

  public constructor(private readonly client: Client) {}

  @Once('ready')
  public async onReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Logged in as ${client.user.tag}!`);
  }

  @On('warn')
  public onWarn(@Context() [info]: ContextOf<'warn'>) {
    this.logger.warn(info);
  }
}
