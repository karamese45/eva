import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { ClientTransactionEntity } from '../../entity/ClientTransaction.entity';

define(ClientTransactionEntity, () => {
  const transaction = new ClientTransactionEntity();
  transaction.amount = 0;
  return transaction;
});
