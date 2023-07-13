import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileTypeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || !value.originalname) throw new BadRequestException('No file provided');

    const uploadFilesType = process.env.UPLOAD_FILES_TYPE || '';
    if (value.mimetype !== uploadFilesType) throw new BadRequestException('Expected CSV format file');
    return value;
  }
}
