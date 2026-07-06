import { Request } from 'express';
import { extname } from 'path';
import { v4 as uuid4 } from 'uuid';
import { diskStorage } from 'multer';

export const editFileName = (
  request: Request,
  file: Express.Multer.File,
  callback: any,
) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = uuid4();
  callback(null, `${name}-${Date.now()}-${randomName}${fileExtName}`);
};

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads/images',
    filename: editFileName,
  }),
};
