// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { BlockRepository } from 'src/repositories/block.repository';
import { BlockUserDto } from './dto';
import { Block } from '@prisma/client';

@Injectable()
export class BlockService {
  constructor(private readonly blockRepository: BlockRepository) {}

  async getBlockedUserIds(blockerId?: number): Promise<number[]> {
    return (await this.blockRepository.findMany({ blockerId })).map(
      (b) => b.blockedId,
    );
  }

  async block({ blockerId, blockedId }: BlockUserDto): Promise<Block> {
    if (blockerId === blockedId) throw new Error('BLOCKER_BLOCKED_EQUAL');
    return this.blockRepository.create({
      blockerId: Number(blockerId),
      blockedId: Number(blockedId),
    });
  }

  async unblock({ blockerId, blockedId }: BlockUserDto): Promise<Block> {
    if (blockerId === blockedId) throw new Error('BLOCKER_BLOCKED_EQUAL');
    return this.blockRepository.remove({
      blockerId: Number(blockerId),
      blockedId: Number(blockedId),
    });
  }
}
