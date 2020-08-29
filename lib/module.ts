import { map } from './provider.map';
import { Module, DynamicModule, Provider, Type } from '@nestjs/common';
import { MailmanService } from './service';
import {
  MailmanOptions,
  MailmanAsyncOptions,
  MailmanOptionsFactory,
} from './interfaces';
import { BullModule } from '@nestjs/bull';
import { MAILMAN_QUEUE } from './constants';
import { MailConsumer } from './queue/consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: MAILMAN_QUEUE,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
    }),
  ],
})
export class MailmanModule {
  /**
   * Register options
   * @param options
   */
  static register(options: MailmanOptions): DynamicModule {
    return {
      global: true,
      module: MailmanModule,
      providers: [
        MailmanService,
        MailConsumer,
        {
          provide: map.MAILABLE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }

  /**
   * Register Async Options
   */
  static registerAsync(options: MailmanAsyncOptions): DynamicModule {
    return {
      global: true,
      module: MailmanModule,
      providers: [
        MailConsumer,
        MailmanService,
        this.createStorageOptionsProvider(options),
      ],
    };
  }

  private static createStorageOptionsProvider(
    options: MailmanAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: map.MAILABLE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [
      (options.useClass || options.useExisting) as Type<MailmanOptions>,
    ];

    return {
      provide: map.MAILABLE_OPTIONS,
      useFactory: async (optionsFactory: MailmanOptionsFactory) =>
        await optionsFactory.createMailmanOptions(),
      inject,
    };
  }
}
