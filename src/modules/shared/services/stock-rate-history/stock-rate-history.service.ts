import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockRateHistoryEntity } from '../../../../entity/StockRateHistory.entity';

@Injectable()
export class StockRateHistoryService {
  constructor(
    @InjectRepository(StockRateHistoryEntity)
    public repository: Repository<StockRateHistoryEntity>,
  ) {}
}
