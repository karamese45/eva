import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { SharedModule } from './modules/shared/shared.module';
import { ClientManagementModule } from './modules/client-management/client-management.module';
import { StockManagementModule } from './modules/stock-management/stock-management.module';
import { ExchangeManagementModule } from './modules/exchange-management/exchange-management.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
      synchronize: true,
      logging: false,
      extra: {
        poolSize: 20,
        connectionTimeoutMillis: 30000,
        query_timeout: 10000,
        statement_timeout: 30000,
      },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 1000,
    }),
    SharedModule,
    ClientManagementModule,
    StockManagementModule,
    ExchangeManagementModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule {}
