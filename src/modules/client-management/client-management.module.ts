import { Module } from '@nestjs/common';
import { ClientManagementController } from './client-management.controller';
import { ClientManagementService } from './client-management.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [ClientManagementController],
  providers: [ClientManagementService],
})
export class ClientManagementModule {}
