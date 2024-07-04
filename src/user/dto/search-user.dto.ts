import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class SearchUserDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  contextUserId?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  input?: string;

  @ApiProperty({
    required: false,
  })
  @IsNumberString({
    no_symbols: true,
  })
  @IsOptional()
  minAge?: string;

  @ApiProperty({
    required: false,
  })
  @IsNumberString({
    no_symbols: true,
  })
  @IsOptional()
  maxAge?: string;
}
