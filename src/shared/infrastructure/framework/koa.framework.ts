import Koa from 'koa';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import cookie from 'koa-cookie';
import logger from 'koa-morgan';
import rateLimit from 'koa-ratelimit';
import koaStatic from 'koa-static';
import Swagger from '@/shared/infrastructure/open-api/swagger.specification';
import {
  SERVER_HOSTNAME,
  SERVER_PORT,
  PROJECT_MODE,
  PROJECT_NAME,
  SWAGGER_API_DOCS
} from '@/shared/infrastructure/config';

const appLayout = require('@/shared/infrastructure/layouts/index.hbs');

const app = new Koa();
const db = new Map();

export const startKoa = (): void => {
  // Middleware
  app.use(cors());
  app.use(
    helmet({
      contentSecurityPolicy: false
    })
  );
  app.use(json());
  app.use(bodyParser());
  app.use(cookie());
  app.use(logger('dev'));
  app.use(
    rateLimit({
      driver: 'memory',
      db,
      duration: 60000,
      errorMessage: 'Sometimes You Just Have to Slow Down.',
      id: (ctx) => ctx.ip,
      headers: {
        remaining: 'Rate-Limit-Remaining',
        reset: 'Rate-Limit-Reset',
        total: 'Rate-Limit-Total'
      },
      max: 1000,
      disableHeader: false
    })
  );

  // Catching downstream errors
  app.on('error', (err: string, ctx: Koa.Context) => {
    ctx.status = ctx.status || 500;
    ctx.body = { message: err.toString() };
  });

  Swagger.get('/', (ctx: any) => {
    ctx.body = appLayout({
      name: PROJECT_NAME,
      mode: PROJECT_MODE,
      docs: SWAGGER_API_DOCS === 'true' ? '/swagger-html' : false
    });
  });

  app.use(Swagger.routes());
  app.use(Swagger.allowedMethods());

  app.use(
    koaStatic(`${require('path').resolve()}/src/shared/infrastructure/layouts`)
  );

  app.listen(SERVER_PORT, () =>
    console.log(`Koa Started in http://${SERVER_HOSTNAME}:${SERVER_PORT}`)
  );
};
