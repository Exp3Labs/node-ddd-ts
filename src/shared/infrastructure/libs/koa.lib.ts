import Koa from 'koa';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import cookie from 'koa-cookie';
import logger from 'koa-morgan';
import rateLimit from 'koa-ratelimit';
import Swagger from '@/shared/infrastructure/libs/swagger.lib';
import { SERVER_PORT } from '@/shared/infrastructure/config';

const app = new Koa();
const db = new Map();

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
  ctx.body = { error: err.toString() };
});

app.use(Swagger.routes());
app.use(Swagger.allowedMethods());

app.listen(SERVER_PORT, () => console.log('Koa started'));
