import { SwaggerRouter } from 'koa-swagger-decorator';
import { getRoutes } from '@/shared/infrastructure/utils/import.util';
import {
  SWAGGER_API_DOCS,
  PROJECT_NAME,
  PROJECT_MODE
} from '@/shared/infrastructure/config';

const router = new SwaggerRouter();

if (SWAGGER_API_DOCS) {
  router.swagger({
    title: PROJECT_NAME,
    description: `API DOC (${PROJECT_MODE})`.toUpperCase(),
    version: '1.0.0',
    swaggerHtmlEndpoint: '/',
    swaggerJsonEndpoint: '/swagger-json'
  });
} else {
  router.get('/', (ctx) => {
    ctx.body = `${PROJECT_NAME}: ${PROJECT_MODE}`.toUpperCase();
  });
}

// Get routes
getRoutes().map((x: object) => router.map(x, {}));

export default router;
