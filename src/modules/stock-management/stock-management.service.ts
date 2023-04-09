import { HttpException, Injectable } from '@nestjs/common';
import { StockService } from '../shared/services/stock/stock.service';
import { StockRateHistoryService } from '../shared/services/stock-rate-history/stock-rate-history.service';
import * as dayjs from 'dayjs';

@Injectable()
export class StockManagementService {
  constructor(
    private stockService: StockService,
    private stockRateHistoryService: StockRateHistoryService,
  ) {}

  async list() {
    return await this.stockService.repository.find();
  }

  async read(id) {
    return await this.stockService.repository.findOneBy({ id: id });
  }

  async create(entity) {
    return await this.stockService.repository.save(entity);
  }
  async update(id, entity) {
    const lastUpdate = await this.stockRateHistoryService.repository.findOne({
      where: {
        stockId: id,
      },
      order: {
        createdAt: 'DESC',
      },
    });
    if (lastUpdate && dayjs(lastUpdate.createdAt).add(1, 'hour') > dayjs()) {
      throw new HttpException(
        'You cannot make more than one update within an hour.',
        400,
      );
    }
    const beforeUpdate = await this.stockService.repository.findOneBy({
      id: id,
    });
    await this.stockRateHistoryService.repository.save({
      stockId: id,
      beforeRate: beforeUpdate.rate,
      afterRate: entity.rate,
    });
    return await this.stockService.repository.update(id, entity);
  }
  async delete(id) {
    return await this.stockService.repository.delete(id);
  }
}
