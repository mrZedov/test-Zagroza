import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { GetRandomDataResultDto } from './dto/get-random-data-result.dto';
import { FileSizeValidationPipe } from './pipes/file-size-validation.pipe';
import { FileTypeValidationPipe } from './pipes/file-type-validation.pipe';
import { FilesService } from './services/files.service';

@ApiTags('Files')
@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('file-upload')
  @ApiOperation({ description: 'Upload file CSV' })
  @ApiOkResponse({ type: GetRandomDataResultDto })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })
  async uploadFile(@UploadedFile(FileSizeValidationPipe, FileTypeValidationPipe) file) {
    return await this.filesService.uploadFile(file.buffer);
  }
}
