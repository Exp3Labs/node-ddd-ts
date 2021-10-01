import { Token } from 'typedi';

import { CatRepository } from '@/cats/domain/cat.repository';

export const CatRepositoryToken = new Token<CatRepository>('cat-repository');
