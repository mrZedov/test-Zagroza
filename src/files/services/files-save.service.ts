import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesSaveService {
  constructor() {}

  async saveFile(buffer: Buffer): Promise<void> {
    const uid = uuidv4();
    const filePath = path.join(process.env.UPLOAD_FILES_PATH || 'upload', uid);
    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        console.error('Ошибка при сохранении файла:', err);
        return;
      }
      console.log('Файл успешно сохранен:', filePath);
    });
  }
}
