import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class BlockUserDto {
  @ApiProperty()
  @IsNumberString({
    no_symbols: true,
  })
  @IsNotEmpty()
  blockerId: string;

  @ApiProperty()
  @IsNumberString({
    no_symbols: true,
  })
  @IsNotEmpty()
  blockedId: string;
}
