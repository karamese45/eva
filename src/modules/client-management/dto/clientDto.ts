import { IsNotEmpty } from 'class-validator';

export class ClientDto {
  @IsNotEmpty()
  name: string;
}
