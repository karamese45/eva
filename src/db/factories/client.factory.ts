import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { ClientEntity } from '../../entity/Client.entity';

define(ClientEntity, () => {
  const user = new ClientEntity();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  user.name = `${firstName} ${lastName}`;
  return user;
});
