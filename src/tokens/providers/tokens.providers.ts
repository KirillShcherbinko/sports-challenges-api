import { DataSource } from 'typeorm';
import { Token } from '../entity/tokens.entity';
import { TOKENS_REPOSITORY } from '../constants/tokens.constants';
import { DATA_SOURCE } from '../../shared/database/constants/database.constants';

export const tokensProviders = [
  {
    provide: TOKENS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Token),
    inject: [DATA_SOURCE],
  },
];
