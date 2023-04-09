import { Body, Controller, Post } from '@nestjs/common';
import { ExchangeDto } from './dto/exchangeDto';
import { ExchangeManagementService } from './exchange-management.service';

@Controller('exchange')
export class ExchangeManagementController {
  constructor(private exchangeManagementService: ExchangeManagementService) {}
  @Post('buy')
  async buy(@Body() body: ExchangeDto) {
    return await this.exchangeManagementService.buy(body);
  }
  @Post('sell')
  async sell(@Body() body: ExchangeDto) {
    return await this.exchangeManagementService.sell(body);
  }
}
