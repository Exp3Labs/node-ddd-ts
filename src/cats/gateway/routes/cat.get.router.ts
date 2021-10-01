import {
  request,
  summary,
  path,
  tags,
  responses,
  Context
} from 'koa-swagger-decorator';
import { CatGetController } from '../controllers/cat.get.controller';

import Container from 'typedi';

//@Service()
export class CatGetRouter {
  @request('GET', '/cats')
  @summary('Get all cats')
  @tags(['Cats'])
  @responses({
    200: { description: 'Successful' },
    500: { description: 'Error' }
  })
  static async getAllCats(ctx: Context) {
    try {
      // Run controller
      const controller = Container.get(CatGetController);
      const res = await controller.getAllCats();
      // Successful response
      ctx.body = res;
    } catch (error: any) {
      // Error response
      ctx.app.emit('error', error, ctx);
    }
  }
}
