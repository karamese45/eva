import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientManagementService } from './client-management.service';
import { ClientDto } from './dto/clientDto';

@Controller('client')
export class ClientManagementController {
  constructor(private clientManagementService: ClientManagementService) {}

  @Get('')
  async list() {
    return this.clientManagementService.list();
  }
  @Get('/:id')
  async read(@Param('id') id: number) {
    return this.clientManagementService.read(id);
  }

  @Post('')
  async create(@Body() entity: ClientDto) {
    return this.clientManagementService.create(entity);
  }
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() entity: ClientDto) {
    return this.clientManagementService.update(id, entity);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.clientManagementService.delete(id);
  }
}
