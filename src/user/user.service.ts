// src/user/user.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, SearchUserDto } from './dto';
import { BlockService } from './block.service';
import { UserRepository } from 'src/repositories/user.repository';
import { Prisma, User } from '@prisma/client';
import { getBirthdateRange, isValidDate } from 'src/utils';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger('UserService');

  constructor(
    private readonly blockService: BlockService,
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { birthYear, birthMonth, birthDate } = createUserDto;

    if (
      !isValidDate(Number(birthYear), Number(birthMonth), Number(birthDate))
    ) {
      throw new Error('INVALID_BIRTH_DATE_DETAILS');
    }

    const options: Prisma.UserCreateInput = {
      ...createUserDto,
      birthYear: Number(createUserDto.birthYear),
      birthMonth: Number(createUserDto.birthMonth),
      birthDate: Number(createUserDto.birthDate),
    };

    return await this.userRepository.create(options);
  }

  async search(dto: SearchUserDto): Promise<User[]> {
    const { contextUserId, input, minAge, maxAge } = dto;

    const blockedUserIds: number[] = await this.blockService.getBlockedUserIds(
      Number(contextUserId) || undefined,
    );

    const { minBirthDate, maxBirthDate } = getBirthdateRange({
      minAge: Number(minAge),
      maxAge: Number(maxAge),
    });

    return await this.userRepository.findMany({
      username: {
        contains: input,
        mode: 'insensitive',
      },
      id: {
        not: {
          in: blockedUserIds,
        },
      },
      AND: [
        {
          OR: minBirthDate
            ? [
                { birthYear: { gte: minBirthDate.birthYear } },
                {
                  birthYear: minBirthDate.birthYear,
                  birthMonth: { gte: minBirthDate.birthMonth },
                },
                {
                  birthYear: minBirthDate.birthYear,
                  birthMonth: minBirthDate.birthMonth,
                  birthDate: { gte: minBirthDate.birthDate },
                },
              ]
            : undefined,
        },
        {
          OR: maxBirthDate
            ? [
                { birthYear: { lte: maxBirthDate.birthYear } },
                {
                  birthYear: maxBirthDate.birthYear,
                  birthMonth: { lte: maxBirthDate.birthMonth },
                },
                {
                  birthYear: maxBirthDate.birthYear,
                  birthMonth: maxBirthDate.birthMonth,
                  birthDate: { lte: maxBirthDate.birthDate },
                },
              ]
            : undefined,
        },
      ],
    });
  }

  async getDetails(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }

    const birthYear = Number(updateUserDto.birthYear) || user.birthYear;
    const birthMonth = Number(updateUserDto.birthMonth) || user.birthMonth;
    const birthDate = Number(updateUserDto.birthDate) || user.birthDate;

    if (!isValidDate(birthYear, birthMonth, birthDate)) {
      throw new Error('INVALID_BIRTH_DATE_DETAILS');
    }

    const options: Prisma.UserUpdateInput = {
      ...updateUserDto,
      birthYear,
      birthMonth,
      birthDate,
    };
    return await this.userRepository.update({ id }, options);
  }
}
