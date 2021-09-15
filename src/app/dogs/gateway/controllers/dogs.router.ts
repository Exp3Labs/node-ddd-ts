// import { SwaggerRouter } from 'koa-swagger-decorator';
import {
  request,
  summary,
  query,
  path,
  body,
  tags,
  Context,
  responses
} from 'koa-swagger-decorator';

import DogPutController from '@/app/dogs/gateway/controllers/dogs.put.controller';
import DogUpdate from '@/app/dogs/application/update-dog';

import { AppContainer } from '@/core/di/config';

export default class Test {
  @request('get', '/users')
  @summary('get user list')
  @tags(['todo'])
  static async getUsers(ctx: any) {
    ctx.body = { list: 'hi todo!' };
  }

  @request('put', '/dogs/{id}')
  @summary('update a dog')
  @tags(['Dogs'])
  @path({
    id: { type: 'string', required: true }
  })
  @body({
    name: {
      type: 'string',
      required: true
    },
    race: {
      type: 'string',
      required: true
    }
  })
  @responses({ 200: { description: 'success' }, 500: { description: 'error' } })
  static async update(ctx: Context) {
    const { id } = ctx.validatedParams;
    const { name, race } = ctx.validatedBody;

    const dogUpdate = AppContainer.get<DogUpdate>(DogUpdate);
    const controller = new DogPutController(dogUpdate);

    await controller.update({ id, name, race });
    ctx.body = { msg: 'updated!' };
  }
}
