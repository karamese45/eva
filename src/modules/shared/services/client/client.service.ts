import { Injectable } from '@nestjs/common';
import { ClientEntity } from '../../../../entity/Client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientTransactionEntity } from '../../../../entity/ClientTransaction.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    public repository: Repository<ClientEntity>,
  ) {}

  async summary(clientId?: number) {
    const query = this.repository
      .createQueryBuilder('client')
      .leftJoinAndMapMany(
        'client.summary',
        (subQuery) => {
          return subQuery
            .select(
              'SUM(clientTransaction.sign_amount) as amount, clientTransaction.stock_id as stockId, clientTransaction.client_id as clientId, stock.name, stock.rate',
            )
            .from(ClientTransactionEntity, 'clientTransaction')
            .leftJoin('clientTransaction.stock', 'stock')
            .groupBy(
              'clientTransaction.client_id, clientTransaction.stock_id, stock.name, stock.rate',
            );
        },
        'summary',
        'summary.clientId = client.id',
      );
    if (clientId) {
      query.andWhere('client.id = :clientId', { clientId: clientId });
      return await query.getRawMany();
    }

    return await query.getRawMany();
  }
}
