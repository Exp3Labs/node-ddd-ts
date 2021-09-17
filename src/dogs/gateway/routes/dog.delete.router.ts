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
import DogContainer from '@/dogs/infrastructure/di/config';

export default class DogDeleteRouter {
  @request('delete', '/dog/{id}')
  @summary('Delete a dog by id')
  @tags(['Dogs'])
  @path({
    id: { type: 'string', required: true }
  })
  @responses({ 200: { description: 'Deleted' }, 500: { description: 'Error' } })
  static async getUsers(ctx: Context) {
    try {
      // Get Params
      const { id } = ctx.validatedParams;
      // Get Container
      const dogDelete = DogContainer.get<DogDelete>(DogDelete);
      // Run controller
      const controller = new DogDeleteController(dogDelete);
      await controller.delete({ id });
      // Successful response
      ctx.body = { result: 'Deleted' };
    } catch (error: any) {
      // Error response
      ctx.status = 500;
      ctx.body = {
        error: error.toString()
      };
    }
  }
}
