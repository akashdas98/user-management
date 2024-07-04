import { Injectable } from '@nestjs/common';
import { Block, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BlockRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(where: Prisma.BlockWhereInput): Promise<Block[]> {
    return this.prisma.block.findMany({ where });
  }

  async findOne({ blockerId, blockedId }: Block): Promise<Block | null> {
    return this.prisma.block.findUnique({
      where: { blockerId_blockedId: { blockerId, blockedId } },
    });
  }

  async create({ blockerId, blockedId }: Block): Promise<Block> {
    try {
      return await this.prisma.block.create({
        data: { blockerId, blockedId },
      });
    } catch (err) {
      let message;

      if (err.code === 'P2002') {
        message = 'RECORD_ALREADY_EXISTS';
      } else if (err.code === 'P2003') {
        message = 'USER_NOT_FOUND';
      } else {
        throw err;
      }
      throw new Error(message);
    }
  }

  async remove({ blockerId, blockedId }: Block): Promise<Block> {
    try {
      return await this.prisma.block.delete({
        where: { blockerId_blockedId: { blockerId, blockedId } },
      });
    } catch (err) {
      let message;

      if (err.code === 'P2025') {
        message = 'RECORD_NOT_FOUND';
      } else if (err.code === 'P2003') {
        message = 'USER_NOT_FOUND';
      } else {
        throw err;
      }
      throw new Error(message);
    }
  }
}
