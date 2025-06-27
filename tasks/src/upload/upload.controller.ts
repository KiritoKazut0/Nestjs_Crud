import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe
  , Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';

import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {

  constructor(private readonly uploadService: UploadService) { }

  @Post('/images')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({
            maxSize: 10 * 1024 * 1024, // 10MB
            message: 'File is too large. Max file size is 10MB',
          }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
    @Body('isPublic') isPublic: string,
  ) {
    const isPublicBool = isPublic === 'true' ? true : false;
    return this.uploadService.uploadFile({ file, isPublic: isPublicBool });
  }

  @Get(':key')
  async getFileUrl(@Param('key') key: string) {
    return this.uploadService.getFileUrl(key);
  }

  @Get('/signed-url/:key')
  async getSingedUrl(@Param('key') key: string) {
    return this.uploadService.getPresignedSignedUrl(key);
  }

  @Delete(':key')
  async deleteFile(@Param('key') key: string) {
    return this.uploadService.deleteFile(key);
  }

}
