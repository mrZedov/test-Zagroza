import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from '../auth/auth.module';
import { Files } from './entities/files.entity';
import { FilesController } from './files.controller';
import { FilesImportService } from './services/files-import.service';
import { FilesSaveService } from './services/files-save.service';
import { FilesService } from './services/files.service';

@Module({
  imports: [MikroOrmModule.forFeature([Files]), AuthModule, UsersModule],
  providers: [FilesService, FilesSaveService, FilesImportService],
  controllers: [FilesController],
})
export class FilesModule {}
