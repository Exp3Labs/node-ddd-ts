import { Container } from 'inversify';
import { TYPES } from './types';
import DogCreate from '@/app/dogs/application/create-dog';
import DogFind from '@/app/dogs/application/find-dog';
import DogUpdate from '@/app/dogs/application/update-dog';
import DogRepository from '@/app/dogs/domain/ports/dog.repository';
import MongoDogRepository from '@/app/dogs/infrastructure/mongo.dog.repository';
// import PostgresDogRepository from '@/dogs/infrastructure/postgres.dog.repository';

const AppContainer = new Container();

// application
AppContainer.bind<DogCreate>(DogCreate).toSelf();
AppContainer.bind<DogFind>(DogFind).toSelf();
AppContainer.bind<DogUpdate>(DogUpdate).toSelf();

// infrastructure
AppContainer.bind<DogRepository>(TYPES.DogRepository).to(MongoDogRepository);
// AppContainer.bind<DogRepository>(TYPES.DogRepository).to(PostgresDogRepository);

export { AppContainer };
