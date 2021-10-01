import 'reflect-metadata';
import { buildProviderModule } from 'inversify-binding-decorators';

import { AppContainer } from '@/shared/infrastructure/d-injection/container';
import { SharedBootstrap } from '@/shared/infrastructure/bootstrap';
import { DogBootstrap } from '@/dogs/infrastructure/bootstrap';

export interface StartModule {
  init(): Promise<void>;
}

const modules = [SharedBootstrap, DogBootstrap];
for (const module of modules) {
  new module().init();
}

AppContainer.load(buildProviderModule());
