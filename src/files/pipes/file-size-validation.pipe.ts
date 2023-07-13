import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || !value.originalname) throw new BadRequestException('No file provided');

    const uploadFilesMaxSize = parseInt(process.env.UPLOAD_FILES_MAX_SIZE);
    if (value.size > uploadFilesMaxSize) throw new BadRequestException('File size exceeds the limit');
    return value;
  }
}
