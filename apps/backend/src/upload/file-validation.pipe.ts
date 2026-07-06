import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileValidationPipe {}

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  private readonly maxSize = 5 * 1024 * 1024;
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('No file provided');
    }

    if (value.size > this.maxSize) {
      throw new BadRequestException(
        `File size exceeds the limit of ${this.maxSize / 1024 / 1024} MB `,
      );
    }

    return value;
  }
}

export class FileTypeValidationPipe implements PipeTransform {
  private readonly allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
  ];

  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('No file provided');
    }

    if (!this.allowedTypes.includes(value.mimetype)) {
      throw new BadRequestException(
        `File type not allowed. Allowed types: ${this.allowedTypes.join(', ')}`,
      );
    }

    return value;
  }
}
