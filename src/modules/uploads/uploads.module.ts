import { Module } from '@nestjs/common';

import { uploadProviders } from './uploads.providers';
import { S3 } from 'src/utils/constants';

@Module({
  providers: [...uploadProviders],
  exports: [S3],
})
export class UploadsModule {}
