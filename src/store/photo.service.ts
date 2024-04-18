import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Express } from 'express';
import * as jimp from 'jimp';
import * as uuid from 'uuid';

@Injectable()
export class PhotoService {
  constructor(private readonly configService: ConfigService) {}

  async resizeAndUpload(
    file: Express.Multer.File,
  ): Promise<string | undefined> {
    if (!file) {
      return undefined;
    }

    const extention = file.mimetype.split('/')[1];
    const serverFileName = `${uuid.v4()}.${extention}`;

    const photo = await jimp.read(file.buffer);
    photo.resize(800, jimp.AUTO);
    await photo.writeAsync(
      `${this.configService.get('UPLOADS_FOLDER')}/${serverFileName}`,
    );
    return serverFileName;
  }
}
