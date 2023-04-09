import { Module } from '@nestjs/common';
import { StockRateHistoryService } from './services/stock-rate-history/stock-rate-history.service';
import { StockService } from './services/stock/stock.service';
import { ClientTransactionService } from './services/client-transaction/client-transaction.service';
import { ClientService } from './services/client/client.service';
import { ClientEntity } from '../../entity/Client.entity';
import { ClientTransactionEntity } from '../../entity/ClientTransaction.entity';
import { StockEntity } from '../../entity/Stock.entity';
import { StockRateHistoryEntity } from '../../entity/StockRateHistory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientEntity,
      ClientTransactionEntity,
      StockEntity,
      StockRateHistoryEntity,
    ]),
  ],
  providers: [
    StockRateHistoryService,
    StockService,
    ClientTransactionService,
    ClientService,
  ],
  exports: [
    StockRateHistoryService,
    StockService,
    ClientTransactionService,
    ClientService,
  ],
})
export class SharedModule {}
