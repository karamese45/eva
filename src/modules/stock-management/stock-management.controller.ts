import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StockManagementService } from './stock-management.service';
import { StockDto } from './dto/stockDto';

@Controller('stock')
export class StockManagementController {
  constructor(private stockManagementService: StockManagementService) {}

  @Get('')
  async list() {
    return this.stockManagementService.list();
  }
  @Get('/:id')
  async read(@Param('id') id: number) {
    return this.stockManagementService.read(id);
  }

  @Post('')
  async create(@Body() entity: StockDto) {
    return this.stockManagementService.create(entity);
  }
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() entity: StockDto) {
    return this.stockManagementService.update(id, entity);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.stockManagementService.delete(id);
  }
}
