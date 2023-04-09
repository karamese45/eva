import { Test, TestingModule } from '@nestjs/testing';
import { StockRateHistoryService } from './stock-rate-history.service';

describe('StockRateHistoryService', () => {
  let service: StockRateHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockRateHistoryService],
    }).compile();

    service = module.get<StockRateHistoryService>(StockRateHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
