import { Test, TestingModule } from '@nestjs/testing';
import { ClientTransactionService } from './client-transaction.service';

describe('ClientTransactionService', () => {
  let service: ClientTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientTransactionService],
    }).compile();

    service = module.get<ClientTransactionService>(ClientTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
