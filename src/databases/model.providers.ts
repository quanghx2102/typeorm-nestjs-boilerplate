import { DataSource } from 'typeorm';

import { User } from '../modules/users/entities/user.entity';
import { USER_REPOSITORY } from 'src/utils/constants';

export const globalProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
