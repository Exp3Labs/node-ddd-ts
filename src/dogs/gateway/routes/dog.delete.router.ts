import {
  request,
  summary,
  path,
  tags,
  responses,
  Context
} from 'koa-swagger-decorator';
import { AppContainer } from '@/shared/infrastructure/d-injection';
import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { CommandBus } from '@/shared/domain/cqrs/command-bus/command.bus';
import { DogDeleteController } from '@/dogs/gateway/controllers/dog.delete.controller';
export class DogDeleteRouter {
  @request('DELETE', '/dogs/{id}')
  @summary('Delete a dog by id')
  @tags(['Dogs'])
  @path({
    id: { type: 'string', required: true }
  })
  @responses({ 204: { description: 'Deleted' }, 500: { description: 'Error' } })
  static async deleteDog(ctx: Context) {
    try {
      // Get Params
      const { id } = ctx.validatedParams;
      // Get Container
      const commandBus = AppContainer.get<CommandBus>(TYPES.CommandBus);
      // Run controller
      const controller = new DogDeleteController(commandBus);
      await controller.deleteDog({ id });
      // Successful response
      ctx.status = 204;
      ctx.body = { result: 'Deleted' };
    } catch (error: any) {
      // Error response
      ctx.app.emit('error', error, ctx);
    }
  }
}
