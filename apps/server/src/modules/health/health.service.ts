import { Inject, Injectable, ServiceUnavailableException } from '@nestjs/common';
import type { HealthData } from '@shared/main';
import { sql } from 'drizzle-orm';
import type { AppDatabase } from '../../common/database/database.provider';
import { DATABASE } from '../../common/database/database.tokens';

@Injectable()
export class HealthService {
  constructor(@Inject(DATABASE) private readonly database: AppDatabase) {}

  getHealth(): HealthData {
    const databaseStatus = this.getDatabaseStatus();

    return {
      status: 'ok',
      database: databaseStatus,
      service: 'agent-app-template-server',
      timestamp: new Date().toISOString(),
    };
  }

  private getDatabaseStatus(): HealthData['database'] {
    try {
      const result = this.database.get<{ value: number }>(sql`select 1 as value`);

      if (result?.value !== 1) {
        throw new Error('Unexpected database health check result.');
      }

      return { status: 'ok' };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Database health check failed.';

      throw new ServiceUnavailableException({
        message: 'Database unavailable',
        errors: { database: message },
      });
    }
  }
}
