import { IsNotEmpty, IsNumber } from 'class-validator';

export class ExchangeDto {
  @IsNotEmpty()
  @IsNumber()
  clientId: number;

  @IsNotEmpty()
  @IsNumber()
  stockId: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
