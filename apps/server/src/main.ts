import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { AppConfig } from './config/app.config';
import { APP_CONFIG } from './config/config.tokens';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<AppConfig>(APP_CONFIG);

  app.enableCors({
    origin: config.corsOrigins,
    credentials: true,
  });

  app.enableShutdownHooks();

  await app.listen(config.serverPort);

  console.log(`Server running on http://localhost:${config.serverPort}`);
}

void bootstrap();
