import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base/base.entity';
import { StockEntity } from './Stock.entity';
import { ClientEntity } from './Client.entity';
@Index(['id'], { unique: true })
@Entity('client_transactions', { schema: 'public' })
export class ClientTransactionEntity extends BaseEntity {
  @Column('bigint', { name: 'client_id' })
  clientId: number;

  @Column('bigint', { name: 'stock_id' })
  stockId: number;

  @Column('varchar', { name: 'type' })
  type: string;

  @Column('float8', { name: 'rate' })
  rate: number;

  @Column('bigint', { name: 'amount' })
  amount: number;

  @Column('bigint', { name: 'sign_amount' })
  signAmount: number;

  @ManyToOne(() => StockEntity, (stock) => stock.clientTransactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'stock_id', referencedColumnName: 'id' }])
  stock: StockEntity;

  @ManyToOne(() => ClientEntity, (client) => client.clientTransactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }])
  client: ClientEntity;
}
