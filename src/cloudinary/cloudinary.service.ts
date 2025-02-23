import { Inject, Injectable } from '@nestjs/common';

import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject('Cloudinary') private cloudinaryInstance: typeof cloudinary
  ) {}

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinaryInstance.uploader.upload_stream(
        (
          error: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined
        ) => {
          if (error) {
            return reject(new Error(error.message));
          }
          if (result) return resolve(result);
        }
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      uploadStream.end(file.buffer); // Передаємо буфер файлу у потік
    });
  }
}
