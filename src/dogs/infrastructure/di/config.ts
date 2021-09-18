import { Container } from 'inversify';
import DogCreate from '@/dogs/application/create-dog';
import DogFind from '@/dogs/application/find-dog';
import DogUpdate from '@/dogs/application/update-dog';
import DogDelete from '@/dogs/application/delete-dog';
import DogFindAll from '@/dogs/application/find-all-dog';
import DogRepository from '@/dogs/domain/ports/dog.repository';
import MongoDogRepository from '@/dogs/infrastructure/mongo.dog.repository';
import { TYPES } from '@/shared/infrastructure/di/types';
// import PostgresDogRepository from '@/dogs/infrastructure/postgres.dog.repository';
export class DogDependencies {

   register(container: Container) {

      container.bind<DogCreate>(DogCreate).toSelf();
      container.bind<DogFind>(DogFind).toSelf();
      container.bind<DogUpdate>(DogUpdate).toSelf();
      container.bind<DogDelete>(DogDelete).toSelf();
      container.bind<DogFindAll>(DogFindAll).toSelf();

      container.bind<DogRepository>(TYPES.DogRepository).to(MongoDogRepository);
      // container.bind<DogRepository>(TYPES.DogRepository).to(PostgresDogRepository);
   }

}