import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumberString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    required: false,
  })
  @IsNumberString({
    no_symbols: true,
  })
  @IsOptional()
  birthYear?: string;

  @ApiProperty({
    required: false,
  })
  @IsNumberString({
    no_symbols: true,
  })
  @IsOptional()
  birthMonth?: string;

  @ApiProperty({
    required: false,
  })
  @IsNumberString({
    no_symbols: true,
  })
  @IsOptional()
  birthDate?: string;
}
