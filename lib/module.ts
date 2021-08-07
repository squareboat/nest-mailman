import { map } from "./provider.map";
import { Module, DynamicModule, Provider, Type } from "@nestjs/common";
import { MailmanService } from "./service";
import {
  MailmanOptions,
  MailmanAsyncOptions,
  MailmanOptionsFactory,
} from "./interfaces";

@Module({})
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
      imports: options.imports || [],
      providers: [MailmanService, this.createStorageOptionsProvider(options)],
    };
  }

  private static createStorageOptionsProvider(
    options: MailmanAsyncOptions
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
