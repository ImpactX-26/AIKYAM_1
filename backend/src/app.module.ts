import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProfileModule } from './modules/profile/profile.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { AgentsModule } from './modules/agents/agents.module';
import { CatalogModule } from './modules/catalog/catalog.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: '../.env' // Read from monorepo root
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const type = configService.get<string>('DB_TYPE', 'sqlite');
        if (type === 'postgres') {
          return {
            type: 'postgres',
            host: configService.get<string>('DB_HOST', 'localhost'),
            port: configService.get<number>('DB_PORT', 5432),
            username: configService.get<string>('DB_USER', 'educaro'),
            password: configService.get<string>('DB_PASSWORD', 'password'),
            database: configService.get<string>('DB_NAME', 'educaro_db'),
            ssl: { rejectUnauthorized: false },
            autoLoadEntities: true,
            synchronize: true, // Prototype mode
          } as any;
        } else {
          return {
            type: 'better-sqlite3',
            database: 'db.sqlite',
            autoLoadEntities: true,
            synchronize: true,
          } as any;
        }
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ProfileModule,
    DocumentsModule,
    AgentsModule,
    CatalogModule,
  ],
})
export class AppModule {}
