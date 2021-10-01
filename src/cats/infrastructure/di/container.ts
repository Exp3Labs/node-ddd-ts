import { Container } from 'typedi';

import { CatRepositoryToken } from '@/cats/infrastructure/di/tokens';
import { MongoCatRepository } from '../mongo.cat.repository';
import { PostgresCatRepository } from '../postgres.cat.repository';

// Cat Repository
Container.set(CatRepositoryToken, new MongoCatRepository());
//Container.set(CatRepositoryToken, new PostgresCatRepository());
