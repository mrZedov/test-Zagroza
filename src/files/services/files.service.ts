import { Injectable } from '@nestjs/common';
import { FilesImportService } from './files-import.service';
import { FilesSaveService } from './files-save.service';

@Injectable()
export class FilesService {
  constructor(private readonly filesSaveService: FilesSaveService, private readonly filesImportService: FilesImportService) {}

  async uploadFile(file: Buffer): Promise<void> {
    const fileStrings = file
      .toString()
      .split('\n')
      .map((v) => v.replace('\r', ''));
    const rowsState = this.validateRows(fileStrings);

    if (rowsState.valid) {
      this.filesImportService.importFile(rowsState.rows, fileStrings);
    } else {
      this.filesSaveService.saveFile(file);
    }
  }

  validateRows(fileStrings: string[]): any {
    if (!fileStrings.length) return [];
    const res = fileStrings[0].split(',');
    const uploadFilesRows = (process.env.UPLOAD_FILES_ROWS || '').split(',');
    return { valid: uploadFilesRows.every((v) => res.includes(v)), rows: res };
  }
}
