import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Files } from '../entities/files.entity';

@Injectable()
export class FilesImportService {
  constructor(@InjectRepository(Files) private readonly filesRepository: EntityRepository<Files>) {}

  async importFile(rows: string[], filesData: string[]): Promise<void> {
    const uploadFilesRows = (process.env.UPLOAD_FILES_ROWS || '').split(',');

    filesData.shift();
    filesData.forEach((data) => {
      const dataObj = data.split(',');
      const recordData = {};
      for (let i = 0; i < dataObj.length; i++) {
        const row = rows[i];
        if (!uploadFilesRows.includes(row)) continue;
        recordData[row] = dataObj[i];
      }
      const record = this.filesRepository.create(recordData);
      this.filesRepository.persist(record);
    });

    await this.filesRepository.flush();
  }
}
