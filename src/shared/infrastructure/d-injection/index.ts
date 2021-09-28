import { Container } from 'inversify';
import { AppDependencies } from '@/shared/infrastructure/d-injection/config';
import { DogDependencies } from '@/dogs/infrastructure/d-injection/config';
import { BreedDependencies } from '@/breeds/infrastructure/d-injection/config';

export const AppContainer = new Container();

const registrationList = [AppDependencies, DogDependencies, BreedDependencies];
for (const reg of registrationList) {
  new reg().register(AppContainer);
}
