import { extname } from 'path';

import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';
import { memoryStorage } from 'multer';
import { v4 as uuid4 } from 'uuid';

export const generateFilename = (file: Express.Multer.File) => {
  const name = file.originalname.split('.')[0];
  const randomName = uuid4();
  const fileExtName = extname(file.originalname);

  return `${name}-${Date.now()}-${randomName}${fileExtName}`;
};

const imageFileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: any,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    return callback(
      new BadRequestException('Only image files are allowed!'),
      false,
    );
  }
  callback(null, true);
};

export const multerConfig: MulterOptions = {
  storage: memoryStorage(),
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
};
