import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ClientService } from '../shared/services/client/client.service';
import { ClientTransactionService } from '../shared/services/client-transaction/client-transaction.service';
import { StockService } from '../shared/services/stock/stock.service';
import { ExchangeDto } from './dto/exchangeDto';

@Injectable()
export class ExchangeManagementService {
  constructor(
    private clientService: ClientService,
    private clientTransactionService: ClientTransactionService,
    private stockService: StockService,
  ) {}

  async buy(dto: ExchangeDto) {
    const { client, stock } = await this.getStockAndClient(dto);

    await this.clientTransactionService.repository.save({
      type: 'buy',
      rate: stock.rate,
      client: client,
      stock: stock,
      amount: dto.amount,
      signAmount: dto.amount,
    });

    const clientSummary = await this.clientService.summary(client.id);

    return clientSummary.map((info) => {
      return {
        amount: info.amount,
        name: info.name,
        rate: info.rate,
      };
    });
  }
  async sell(dto: ExchangeDto) {
    const { client, stock } = await this.getStockAndClient(dto);

    const clientSummary = await this.clientService.summary(client.id);

    const sellableSummary = clientSummary.find(
      (info) => info.stockid === stock.id,
    );

    if (sellableSummary) {
      if (sellableSummary.amount < dto.amount) {
        throw new HttpException(
          'You do not have enough amount that can be sold',
          400,
        );
      }

      await this.clientTransactionService.repository.save({
        type: 'sell',
        rate: stock.rate,
        client: client,
        stock: stock,
        amount: dto.amount,
        signAmount: dto.amount * -1,
      });

      const clientSummary = await this.clientService.summary(client.id);

      return clientSummary.map((info) => {
        return {
          amount: info.amount,
          name: info.name,
          rate: info.rate,
        };
      });
    }

    throw new HttpException('You do not have a share that can be sold', 400);
  }

  private async getStockAndClient(dto: ExchangeDto) {
    const client = await this.clientService.repository.findOneBy({
      id: dto.clientId,
    });

    const stock = await this.stockService.repository.findOneBy({
      id: dto.stockId,
    });

    if (client && stock) {
      return { client, stock };
    }

    throw new HttpException('Invalid Foreign Keys', 400);
  }
}
