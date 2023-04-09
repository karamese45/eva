import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base/base.entity';
import { ClientTransactionEntity } from './ClientTransaction.entity';

@Index(['id'], { unique: true })
@Entity('clients', { schema: 'public' })
export class ClientEntity extends BaseEntity {
  @Column('varchar', { name: 'name' })
  name: string;

  @OneToMany(
    () => ClientTransactionEntity,
    (clientTransaction) => clientTransaction.stock,
  )
  clientTransactions: ClientTransactionEntity[];
}
