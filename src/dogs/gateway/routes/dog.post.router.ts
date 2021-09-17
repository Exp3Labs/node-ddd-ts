import {
  request,
  summary,
  body,
  tags,
  responses,
  Context
} from 'koa-swagger-decorator';
import DogPostController from '@/dogs/gateway/controllers/dog.post.controller';
import DogCreate from '@/dogs/application/create-dog';
import DogContainer from '@/dogs/infrastructure/di/config';

export default class DogPostRouter {
  @request('post', '/dog')
  @summary('Create a dog')
  @tags(['Dogs'])
  @body({
    id: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    breed: {
      type: 'string',
      required: true
    }
  })
  @responses({ 201: { description: 'Created' }, 500: { description: 'Error' } })
  static async getUsers(ctx: Context) {
    try {
      // Get Params
      const { id, name, breed } = ctx.validatedBody;
      // Get Container
      const dogCreator = DogContainer.get<DogCreate>(DogCreate);
      // Run controller
      const controller = new DogPostController(dogCreator);
      await controller.create({ id, name, breed });
      // Successful response
      ctx.status = 201;
      ctx.body = { result: 'Created' };
    } catch (error: any) {
      // Error response
      ctx.status = 500;
      ctx.body = {
        error
      };
    }
  }
}
