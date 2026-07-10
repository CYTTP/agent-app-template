import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:8080'],
    credentials: true,
  });

  const port = Number(process.env.SERVER_PORT ?? 8787);
  await app.listen(port);

  console.log(`Server running on http://localhost:${port}`);
}

void bootstrap();
