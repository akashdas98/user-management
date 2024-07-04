import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { BlockController } from './block.controller';
import { UserService } from './user.service';
import { BlockService } from './block.service';
import { UserRepository } from '../repositories/user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { BlockRepository } from 'src/repositories/block.repository';

@Module({
  controllers: [UserController, BlockController],
  providers: [
    PrismaService,
    UserService,
    BlockService,
    UserRepository,
    BlockRepository,
  ],
})
export class UserModule {}
