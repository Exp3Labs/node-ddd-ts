import { Container } from 'inversify';
import { AppDependencies } from '@/shared/infrastructure/di/config';
import { DogDependencies } from '@/dogs/infrastructure/di/config';

const AppContainer = new Container();

const registrationList = [AppDependencies, DogDependencies];
for (const reg of registrationList) {
  new reg().register(AppContainer);
}

export default AppContainer;
