import {
  request,
  summary,
  path,
  tags,
  middlewares,
  responses,
  Context
} from 'koa-swagger-decorator';
import DogGetController from '@/dogs/gateway/controllers/dog.get.controller';
import DogFind from '@/dogs/application/find-dog';
import DogFindAll from '@/dogs/application/find-all-dog';
import AppContainer from '@/shared/infrastructure/di';
import { isAuth } from '@/shared/infrastructure/mw/auth.mw';

export default class DogGetRouter {
  @request('get', '/dogs/{id}')
  @summary('Get a dog by id')
  @tags(['Dogs'])
  @path({
    id: { type: 'string', required: true }
  })
  @responses({
    200: { description: 'Successful' },
    500: { description: 'Error' }
  })
  static async get(ctx: Context) {
    try {
      // Get Params
      const { id } = ctx.validatedParams;
      // Get Container
      const dogFind = AppContainer.get<DogFind>(DogFind);
      const dogFindAll = AppContainer.get<DogFindAll>(DogFindAll);
      // Run controller
      const controller = new DogGetController(dogFind, dogFindAll);
      const res = await controller.get({ id });
      // Successful response
      ctx.body = res;
    } catch (error: any) {
      // Error response
      ctx.app.emit('error', error, ctx);
    }
  }

  @request('get', '/dogs')
  @summary('Get all the dogs')
  @tags(['Dogs'])
  @middlewares([isAuth])
  @responses({
    200: { description: 'Successful' },
    500: { description: 'Error' }
  })
  static async getAll(ctx: Context) {
    try {
      // Get current user
      const { user }: any = ctx.req;
      console.log('=> user', user);
      // Get Container
      const dogFind = AppContainer.get<DogFind>(DogFind);
      const dogFindAll = AppContainer.get<DogFindAll>(DogFindAll);
      // Run controller
      const controller = new DogGetController(dogFind, dogFindAll);
      const res = await controller.getAll();
      // Successful response
      ctx.body = res;
    } catch (error: any) {
      // Error response
      ctx.app.emit('error', error, ctx);
    }
  }
}
