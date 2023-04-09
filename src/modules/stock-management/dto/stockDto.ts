import { IsDecimal, IsNotEmpty, Length } from 'class-validator';

export class StockDto {
  @IsNotEmpty()
  @Length(1, 3)
  name: string;

  @IsDecimal({ force_decimal: true, decimal_digits: '2' })
  @IsNotEmpty()
  rate: string;
}
