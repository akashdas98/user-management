import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, SearchUserDto, UpdateUserDto } from './dto';
import { UserDataDto } from './dto/user-data.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @Put()
  async put(
    @Query() userDataDto: UserDataDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(Number(userDataDto.id), updateUserDto);
  }

  @Get('search')
  async search(@Query() searchUserDto: SearchUserDto) {
    const cacheKey = `search-${JSON.stringify(searchUserDto)}`;
    const cachedResult = await this.cacheManager.get(cacheKey);

    if (cachedResult) {
      return cachedResult;
    }

    const result = await this.userService.search(searchUserDto);
    await this.cacheManager.set(cacheKey, result);
    return result;
  }

  @Get(':id')
  async get(@Param() dto: UserDataDto) {
    const cacheKey = `user-${dto.id}`;
    const cachedUser = await this.cacheManager.get(cacheKey);

    if (cachedUser) {
      return cachedUser;
    }

    const user = await this.userService.getDetails(Number(dto.id));
    await this.cacheManager.set(cacheKey, user);
    return user;
  }
}
