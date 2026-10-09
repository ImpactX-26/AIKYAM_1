// Force backend restart
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { seed } from './seed';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  
  // Serve static uploads
  app.useStaticAssets(join(__dirname, '..', 'public', 'uploads'), {
    prefix: '/uploads/',
  });
  
  // Seed Database
  const dataSource = app.get(DataSource);
  await seed(dataSource);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');}
bootstrap();
