import Koa from 'koa';
import cors from '@koa/cors';
import json from 'koa-json';
import cookie from 'koa-cookie';
import logger from 'koa-logger';
import 'reflect-metadata';
import rateLimit from 'koa-ratelimit';
import helmet from 'koa-helmet';

import DogPostController from '@/app/dogs/gateway/controllers/dogs.post.controller';
import DogGetController from '@/app/dogs/gateway/controllers/dogs.get.controller';

import { AppContainer } from '@/core/di/config';
import DogCreate from '@/app/dogs/application/create-dog';
import DogFind from '@/app/dogs/application/find-dog';

import { SwaggerRouter } from 'koa-swagger-decorator';
import DogRouter from '@/app/dogs/gateway/controllers/dogs.router';
const koaBody = require('koa-body');

const app = new Koa();
// const router = new Router();
const router = new SwaggerRouter(); // extends from koa-router

// Middlewares
app.use(cors());
app.use(json());
app.use(cookie());
app.use(logger());
app.use(
  helmet({
    contentSecurityPolicy: false
  })
);
app.use(koaBody());
app.use(
  rateLimit({
    driver: 'memory',
    db: new Map(),
    duration: 60000,
    errorMessage: 'Sometimes You Just Have to Slow Down.',
    id: (ctx) => ctx.ip,
    headers: {
      remaining: 'Rate-Limit-Remaining',
      reset: 'Rate-Limit-Reset',
      total: 'Rate-Limit-Total'
    },
    max: 600,
    disableHeader: false
  })
);

// Hello world
router.get('/', async (ctx, next) => {
  ctx.body = { msg: 'Hello world!' };
  await next();
});

router.get('/nais', async (ctx, next) => {
  ctx.body = { msg: 'nais!' };
  await next();
});

router.post('/dogs', async (ctx: any, next) => {
  const { id, name, race } = ctx.request.body;

  const dogCreator = AppContainer.get<DogCreate>(DogCreate);
  const controller = new DogPostController(dogCreator);

  await controller.create({ id, name, race });
  ctx.body = { msg: 'created!' };
  await next();
});

router.get('/dogs/:id', async (ctx: any, next) => {
  const { id } = ctx.request.params;

  const dogFind = AppContainer.get<DogFind>(DogFind);
  const controller = new DogGetController(dogFind);

  const res = await controller.get({ id });
  ctx.body = res;

  await next();
});

// Swagger();
router.swagger({
  title: 'Example Server',
  description: 'API DOC',
  version: '1.0.0',

  // [optional] default is root path.
  // if you are using koa-swagger-decorator within nested router, using this param to let swagger know your current router point
  prefix: '/',

  // [optional] default is /swagger-html
  swaggerHtmlEndpoint: '/swagger-html',

  // [optional] default is /swagger-json
  swaggerJsonEndpoint: '/swagger-json',

  // [optional] additional options for building swagger doc
  // eg. add api_key as shown below
  swaggerOptions: {
    securityDefinitions: {
      api_key: {
        type: 'apiKey',
        in: 'header',
        name: 'api_key'
      }
    }
  },
  // [optional] additional configuration for config how to show swagger view
  swaggerConfiguration: {
    display: {
      defaultModelsExpandDepth: 4, // The default expansion depth for models (set to -1 completely hide the models).
      defaultModelExpandDepth: 3, // The default expansion depth for the model on the model-example section.
      docExpansion: 'list', // Controls the default expansion setting for the operations and tags.
      defaultModelRendering: 'model' // Controls how the model is shown when the API is first rendered.
    }
  }
});

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

router.map(DogRouter, {});

// dump swagger json
// router.dumpSwaggerJson({
//   filename: 'swagger.json', // default is swagger.json
//   dir: process.cwd() // default is process.cwd()
// });

// router.mapDir(path.resolve(__dirname), {
//   // default: true. To recursively scan the dir to make router. If false, will not scan subroutes dir
//   // recursive: true,
//   // default: true, if true, you can call ctx.validatedBody[Query|Params] to get validated data.
//   // doValidation: true,
//   // default: [], paths to ignore while looking for decorators
//   // ignore: ["**.spec.ts"],
// });

// Routes
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('=============> Koa started!');
});
