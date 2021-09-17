import { Container } from 'inversify';
import { TYPES } from '@/dogs/infrastructure/di/types';
import DogCreate from '@/dogs/application/create-dog';
import DogFind from '@/dogs/application/find-dog';
import DogUpdate from '@/dogs/application/update-dog';
import DogDelete from '@/dogs/application/delete-dog';
import DogFindAll from '@/dogs/application/find-all-dog';
import DogRepository from '@/dogs/domain/ports/dog.repository';
import MongoDogRepository from '@/dogs/infrastructure/mongo.dog.repository';
// import PostgresDogRepository from '@/dogs/infrastructure/postgres.dog.repository';

const DogContainer = new Container();

// application
DogContainer.bind<DogCreate>(DogCreate).toSelf();
DogContainer.bind<DogFind>(DogFind).toSelf();
DogContainer.bind<DogUpdate>(DogUpdate).toSelf();
DogContainer.bind<DogDelete>(DogDelete).toSelf();
DogContainer.bind<DogFindAll>(DogFindAll).toSelf();

// infrastructure
DogContainer.bind<DogRepository>(TYPES.DogRepository).to(MongoDogRepository);
// AppContainer.bind<DogRepository>(TYPES.DogRepository).to(PostgresDogRepository);

export default DogContainer;
