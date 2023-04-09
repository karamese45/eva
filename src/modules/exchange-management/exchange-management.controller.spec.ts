import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeManagementController } from './exchange-management.controller';

describe('ExchangeManagementController', () => {
  let controller: ExchangeManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangeManagementController],
    }).compile();

    controller = module.get<ExchangeManagementController>(ExchangeManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
