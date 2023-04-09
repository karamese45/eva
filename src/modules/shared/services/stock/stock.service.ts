import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockEntity } from '../../../../entity/Stock.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(StockEntity)
    public repository: Repository<StockEntity>,
  ) {}
}
