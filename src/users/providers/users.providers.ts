import { DataSource } from 'typeorm';
import { User } from '../entity/users.entity';
import { USERS_REPOSITORY } from '../constants/users.constants';
import { DATA_SOURCE } from 'src/db/constants/db.constants';

export const usersProviders = [
  {
    provide: USERS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE],
  },
];
