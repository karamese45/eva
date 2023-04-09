import { Module } from '@nestjs/common';
import { ExchangeManagementController } from './exchange-management.controller';
import { ExchangeManagementService } from './exchange-management.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [ExchangeManagementController],
  providers: [ExchangeManagementService],
})
export class ExchangeManagementModule {}
