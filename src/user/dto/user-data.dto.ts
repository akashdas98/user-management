import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UserDataDto {
  @ApiProperty()
  @IsNumberString({
    no_symbols: true,
  })
  @IsNotEmpty()
  id: string;
}
