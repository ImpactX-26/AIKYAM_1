import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { seed } from './seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  // Seed Database
  const dataSource = app.get(DataSource);
  await seed(dataSource);

  await app.listen(3000);
}
bootstrap();
