import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseEntity } from 'src/common/base/base.entity';

@Injectable()
export class BaseService<T extends BaseEntity> {
  constructor(private readonly genericRepository: Repository<T>) {}
}
