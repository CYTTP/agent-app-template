import { Global, Module } from '@nestjs/common';
import { loadAppConfig } from './app.config';
import { APP_CONFIG } from './config.tokens';

@Global()
@Module({
  providers: [
    {
      provide: APP_CONFIG,
      useFactory: () => loadAppConfig(),
    },
  ],
  exports: [APP_CONFIG],
})
export class ConfigModule {}
