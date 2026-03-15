import { DataSource } from 'typeorm';
import { Token } from '../entity/tokens.entity';
import { TOKENS_REPOSITORY } from '../constants/tokens.constants';

export const tokensProviders = [
  {
    provide: TOKENS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Token),
    inject: [DataSource],
  },
];
