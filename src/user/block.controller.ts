import { Controller, Post, Param, Delete, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlockUserDto, UnblockUserDto } from './dto';
import { BlockService } from './block.service';

@ApiTags('blocking')
@Controller('block')
export class BlockController {
  private readonly logger: Logger = new Logger('BlockController');
  constructor(private readonly blockService: BlockService) {}

  @Post(':blockerId/:blockedId')
  async block(@Param() blockUserDto: BlockUserDto) {
    return await this.blockService.block(blockUserDto);
  }

  @Delete(':blockerId/:blockedId')
  async unblock(@Param() unblockUserDto: UnblockUserDto) {
    return await this.blockService.unblock(unblockUserDto);
  }
}
