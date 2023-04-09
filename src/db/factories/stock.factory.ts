import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { StockEntity } from '../../entity/Stock.entity';

define(StockEntity, () => {
  const stock = new StockEntity();
  stock.name = faker.helpers.replaceSymbols('???').toUpperCase();
  stock.rate = faker.datatype.float({
    min: 0.01,
    max: 99.99,
    precision: 0.01,
  });
  return stock;
});
