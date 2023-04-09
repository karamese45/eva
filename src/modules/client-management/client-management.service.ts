import { Injectable } from '@nestjs/common';
import { ClientService } from '../shared/services/client/client.service';

@Injectable()
export class ClientManagementService {
  constructor(private clientService: ClientService) {}

  async list() {
    return await this.clientService.summary();
    //return await this.clientService.repository.find();
  }

  async read(id) {
    return await this.clientService.repository.findOneBy({ id: id });
  }

  async create(entity) {
    return await this.clientService.repository.save(entity);
  }
  async update(id, entity) {
    return await this.clientService.repository.update(id, entity);
  }
  async delete(id) {
    return await this.clientService.repository.delete(id);
  }
}
