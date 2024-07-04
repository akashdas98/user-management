import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNumberString({
    no_symbols: true,
  })
  @IsNotEmpty()
  birthYear: string;

  @ApiProperty()
  @IsNumberString({
    no_symbols: true,
  })
  @IsNotEmpty()
  birthMonth: string;

  @ApiProperty()
  @IsNumberString({
    no_symbols: true,
  })
  @IsNotEmpty()
  birthDate: string;
}
