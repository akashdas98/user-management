import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(where: Prisma.UserWhereInput): Promise<User[]> {
    return this.prisma.user.findMany({ where });
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return await this.prisma.user.create({ data });
    } catch (err) {
      let message;

      if (err.code === 'P2002') {
        message = 'USERNAME_ALREADY_EXISTS';
      } else {
        throw err;
      }
      throw new Error(message);
    }
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    try {
      return await this.prisma.user.update({ where, data });
    } catch (err) {
      let message;

      if (err.code === 'P2002') {
        message = 'USERNAME_ALREADY_EXISTS';
      } else if (err.code === 'P2025') {
        message = 'USER_NOT_FOUND';
      } else {
        throw err;
      }
      throw new Error(message);
    }
  }
}
