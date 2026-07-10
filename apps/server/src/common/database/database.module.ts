import { Global, Module } from '@nestjs/common';
import { DatabaseProvider } from './database.provider';
import { DATABASE } from './database.tokens';

@Global()
@Module({
  providers: [
    DatabaseProvider,
    {
      provide: DATABASE,
      useFactory: (provider: DatabaseProvider) => provider.db,
      inject: [DatabaseProvider],
    },
  ],
  exports: [DATABASE],
})
export class DatabaseModule {}
