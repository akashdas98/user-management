import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { BlockRepository } from './repositories/block.repository';
import { UserRepository } from './repositories/user.repository';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      ttl: 600, // seconds
      max: 100,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserRepository, BlockRepository],
  exports: [PrismaService, UserRepository, BlockRepository],
})
export class AppModule {}
