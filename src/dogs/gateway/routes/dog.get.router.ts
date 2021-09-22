import {
  request,
  summary,
  path,
  tags,
  middlewares,
  responses,
  Context
} from 'koa-swagger-decorator';
import { AppContainer } from '@/shared/infrastructure/d-injection';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { isAuth } from '@/shared/infrastructure/middleware/swagger.middleware';
import { QueryBus } from '@/shared/domain/cqrs/query-bus/query.bus';
import { DogGetController } from '@/dogs/gateway/controllers/dog.get.controller';
export class DogGetRouter {
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
  static async getDog(ctx: Context) {
    try {
      // Get Params
      const { id } = ctx.validatedParams;
      // Get Container
      const queryBus = AppContainer.get<QueryBus>(TYPES.QueryBus);
      // Run controller
      const controller = new DogGetController(queryBus);
      const res = await controller.getDog({ id });
      // Successful response
      ctx.body = res;
    } catch (error: any) {
      // Error response
      ctx.app.emit('error', error, ctx);
    }
  }

  @request('GET', '/dogs')
  @summary('Get all the dogs')
  @tags(['Dogs'])
  // @middlewares([isAuth])
  @responses({
    200: { description: 'Successful' },
    500: { description: 'Error' }
  })
  static async getAllDogs(ctx: Context) {
    try {
      // Get current user
      // const { user }: any = ctx.req;
      // console.log('=> user', user);
      // Get Container
      const queryBus = AppContainer.get<QueryBus>(TYPES.QueryBus);
      // Run controller
      const controller = new DogGetController(queryBus);
      const res = await controller.getAllDogs();
      // Successful response
      ctx.body = res;
    } catch (error: any) {
      // Error response
      ctx.app.emit('error', error, ctx);
    }
  }
}
