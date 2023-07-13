import { Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { SearchRequestPipe } from '../shared/controllers/search/pipes/search-request.pipe';
import { UserCreateDto } from './dto/users-create.dto';
import { UsersQueryDto } from './dto/users-query.dto';
import { UsersSearchResultDto } from './dto/users-search.result.dto';
import { Users } from './entities/users.entity';
import { UsersSearchService } from './services/users-search.service';
import { UsersService } from './services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userSearchService: UsersSearchService, private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ description: 'This request allows you to get list of users.' })
  @ApiOkResponse({ type: UsersSearchResultDto })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  async query(@Query(SearchRequestPipe) query: UsersQueryDto) {
    const result = await this.userSearchService.query(query);
    return result;
  }

  @Post()
  @ApiOperation({ description: 'This request allows you to create user.' })
  @ApiCreatedResponse({ type: Users })
  @UsePipes(new ValidationPipe({ transform: true, transformOptions: { excludeExtraneousValues: true, exposeUnsetFields: false } }))
  async create(@Body() data: UserCreateDto) {
    await this.usersService.create(data);
  }
}
