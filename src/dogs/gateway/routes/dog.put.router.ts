import {
  request,
  summary,
  path,
  body,
  tags,
  Context,
  responses
} from 'koa-swagger-decorator';
import { AppContainer } from '@/shared/infrastructure/d-injection';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { CommandBus } from '@/shared/domain/cqrs/command-bus/command.bus';
import { UpdateDogUseCase } from '@/dogs/application/update-dog/use.case';
import { DogPutController } from '@/dogs/gateway/controllers/dog.put.controller';
export class DogPutRouter {
  @request('PUT', '/dogs/{id}')
  @summary('Update a dog by id')
  @tags(['Dogs'])
  @path({
    id: { type: 'string', required: true }
  })
  @body({
    name: {
      type: 'string',
      required: true
    },
    breed: {
      type: 'string',
      required: true
    }
  })
  @responses({ 200: { description: 'Updated' }, 500: { description: 'Error' } })
  static async updateDog(ctx: Context) {
    try {
      // Get Params
      const { id } = ctx.validatedParams;
      const { name, breed } = ctx.validatedBody;
      // Get Container
      const commandBus = AppContainer.get<CommandBus>(TYPES.CommandBus);
      // Run controller
      const controller = new DogPutController(commandBus);
      await controller.updateDog({ id, name, breed });
      // Successful response
      ctx.body = { result: 'Updated' };
    } catch (error) {
      // Error response
      ctx.app.emit('error', error, ctx);
    }
  }
}
