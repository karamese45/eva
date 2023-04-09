import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeManagementService } from './exchange-management.service';

describe('ExchangeManagementService', () => {
  let service: ExchangeManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeManagementService],
    }).compile();

    service = module.get<ExchangeManagementService>(ExchangeManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
