import { Container } from 'inversify';
import { AppDependencies } from '@/shared/infrastructure/d-injection/config';
import { DogDependencies } from '@/dogs/infrastructure/d-injection/config';

export const AppContainer = new Container();

const registrationList = [AppDependencies, DogDependencies];
for (const reg of registrationList) {
  new reg().register(AppContainer);
}
