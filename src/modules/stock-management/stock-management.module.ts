import { Module } from '@nestjs/common';
import { StockManagementController } from './stock-management.controller';
import { StockManagementService } from './stock-management.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [StockManagementController],
  providers: [StockManagementService],
})
export class StockManagementModule {}
