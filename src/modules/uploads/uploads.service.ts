import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';

import { S3 } from 'src/utils/constants';

@Injectable()
export class UploadsService {
  constructor(@Inject(S3) private readonly s3Client: S3Client) {}

  async singleUpload(file: Express.Multer.File): Promise<string> {
    const key = `${Date.now()}_${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    });

    try {
      await this.s3Client.send(command);
      return `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${key}`;
    } catch (error) {
      console.error('Error uploading image to S3:', error);
      throw error;
    }
  }
}
