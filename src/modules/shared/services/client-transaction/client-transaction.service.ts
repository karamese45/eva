import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientTransactionEntity } from '../../../../entity/ClientTransaction.entity';

@Injectable()
export class ClientTransactionService {
  constructor(
    @InjectRepository(ClientTransactionEntity)
    public repository: Repository<ClientTransactionEntity>,
  ) {}
}
