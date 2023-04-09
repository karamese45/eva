import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { ClientEntity } from '../../entity/Client.entity';
import { StockEntity } from '../../entity/Stock.entity';
import { faker } from '@faker-js/faker';
import { ClientTransactionEntity } from '../../entity/ClientTransaction.entity';
import { Logger } from '@nestjs/common';

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const clients = await factory(ClientEntity)().createMany(30);
    const stocks = await factory(StockEntity)().createMany(15);

    for (const client of clients) {
      const clientStocks = [
        stocks[Math.floor(Math.random() * stocks.length)],
        stocks[Math.floor(Math.random() * stocks.length)],
        stocks[Math.floor(Math.random() * stocks.length)],
        stocks[Math.floor(Math.random() * stocks.length)],
      ];

      for (const stock of clientStocks) {
        try {
          let totalAmount = 0;
          await factory(ClientTransactionEntity)()
            .map(async (transaction) => {
              transaction.client = client;
              transaction.stock = stock;
              transaction.type = 'buy';
              transaction.rate = stock.rate;
              transaction.amount = faker.datatype.number({
                min: 0,
                max: 10000,
              });
              transaction.signAmount = transaction.amount;
              totalAmount += transaction.amount;
              return transaction;
            })
            .createMany(10);
          await factory(ClientTransactionEntity)()
            .map(async (transaction) => {
              transaction.client = client;
              transaction.stock = stock;
              transaction.type = 'sell';
              transaction.rate = stock.rate;
              transaction.amount = faker.datatype.number({
                min: 0,
                max: totalAmount,
              });
              transaction.signAmount = transaction.amount * -1;
              totalAmount -= transaction.amount;
              return transaction;
            })
            .createMany(7);
        } catch (error) {
          Logger.error(error);
        }
      }
    }
  }
}
