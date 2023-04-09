import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base/base.entity';
import { StockEntity } from './Stock.entity';

@Index(['id'], { unique: true })
@Entity('stock_rate_histories', { schema: 'public' })
export class StockRateHistoryEntity extends BaseEntity {
  @Column('bigint', { name: 'stock_id' })
  stockId: number;

  @Column('float8', { name: 'before_rate' })
  beforeRate: number;

  @Column('float8', { name: 'after_rate' })
  afterRate: number;

  @ManyToOne(() => StockEntity, (stock) => stock.stockRateHistories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'stock_id', referencedColumnName: 'id' }])
  stock: StockEntity;
}
