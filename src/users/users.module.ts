import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { UsersSearchService } from './services/users-search.service';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Users])],
  providers: [UsersSearchService, UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
