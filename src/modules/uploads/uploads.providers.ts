import { S3Client } from '@aws-sdk/client-s3';

import { S3 } from 'src/utils/constants';

export const uploadProviders = [
  {
    provide: S3,
    useFactory: () =>
      new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY,
          secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
        },
      }),
  },
];
