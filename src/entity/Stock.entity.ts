import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base/base.entity';
import { StockRateHistoryEntity } from './StockRateHistory.entity';
import { ClientTransactionEntity } from './ClientTransaction.entity';

@Index(['id'], { unique: true })
@Entity('stocks', { schema: 'public' })
export class StockEntity extends BaseEntity {
  @Column('varchar', { name: 'name', length: 3 })
  name: string;

  @Column('float8', { name: 'rate' })
  rate: number;

  @OneToMany(() => StockRateHistoryEntity, (stockHistory) => stockHistory.stock)
  stockRateHistories: StockRateHistoryEntity[];

  @OneToMany(
    () => ClientTransactionEntity,
    (clientTransaction) => clientTransaction.stock,
  )
  clientTransactions: ClientTransactionEntity[];
}
