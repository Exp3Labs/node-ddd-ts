import { StartModule } from '@/index';

import { AppContainer } from '@/shared/infrastructure/d-injection/container';
import { DogContainerModule } from '@/dogs/infrastructure/d-injection/config';

export class DogBootstrap implements StartModule {
  async init(): Promise<void> {
    try {
      // independency injection
      AppContainer.load(DogContainerModule);
    } catch (error) {
      console.log(`[${DogBootstrap.name}] error starting module --> ${error}`);
    }
  }
}
