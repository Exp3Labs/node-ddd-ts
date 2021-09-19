import {
  request,
  summary,
  path,
  tags,
  responses,
  Context
} from 'koa-swagger-decorator';
import DogDeleteController from '@/dogs/gateway/controllers/dog.delete.controller';
import DogDelete from '@/dogs/application/delete-dog';
import AppContainer from '@/shared/infrastructure/di';

export default class DogDeleteRouter {
  @request('DELETE', '/dogs/{id}')
  @summary('Delete a dog by id')
  @tags(['Dogs'])
  @path({
    id: { type: 'string', required: true }
  })
  @responses({ 204: { description: 'Deleted' }, 500: { description: 'Error' } })
  static async getUsers(ctx: Context) {
    try {
      // Get Params
      const { id } = ctx.validatedParams;
      // Get Container
      const dogDelete = AppContainer.get<DogDelete>(DogDelete);
      // Run controller
      const controller = new DogDeleteController(dogDelete);
      await controller.delete({ id });
      // Successful response
      ctx.status = 204;
      ctx.body = { result: 'Deleted' };
    } catch (error: any) {
      // Error response
      ctx.app.emit('error', error, ctx);
    }
  }
}
