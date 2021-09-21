import {
  request,
  summary,
  body,
  tags,
  responses,
  Context
} from 'koa-swagger-decorator';
import DogPostController from '@/dogs/gateway/controllers/dog.post.controller';
import { DogCreate } from '@/dogs/application/create-dog/use.case';
import AppContainer from '@/shared/infrastructure/d-injection';
import { CommandBus } from '@/shared/domain/command-bus/command.bus';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
export default class DogPostRouter {
  @request('POST', '/dogs')
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
  static async createDog(ctx: Context) {
    try {
      // Get Params
      const { id, name, breed } = ctx.validatedBody;
      // Get Container
      const commandBus = AppContainer.get<CommandBus>(TYPES.CommandBus);
      // Run controller
      const controller = new DogPostController(commandBus);
      await controller.create({ id, name, breed });
      // Successful response
      ctx.status = 201;
      ctx.body = { result: 'Created' };
    } catch (error: any) {
      // Error response
      ctx.app.emit('error', error, ctx);
    }
  }
}
