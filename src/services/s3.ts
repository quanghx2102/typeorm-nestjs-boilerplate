import { Injectable } from '@nestjs/common';
import {
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private readonly s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
    },
  });

  async singleUpload(
    fileName: string,
    buffer: Buffer,
  ): Promise<{ b: PutObjectCommandOutput }> {
    const putCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: fileName,
      Body: buffer,
    });

    // const a = await this.s3Client.send(createCommand);
    const b = await this.s3Client.send(putCommand);

    return { b };
  }
}
