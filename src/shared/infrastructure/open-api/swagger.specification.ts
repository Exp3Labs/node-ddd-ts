import { SwaggerRouter } from 'koa-swagger-decorator';
import { getRoutes } from '@/shared/infrastructure/system/import.system';
import {
  SWAGGER_API_DOCS,
  PROJECT_NAME,
  PROJECT_MODE
} from '@/shared/infrastructure/config';

const router = new SwaggerRouter();

if (SWAGGER_API_DOCS === 'true') {
  router.swagger({
    title: PROJECT_NAME,
    description: `API DOC (${PROJECT_MODE})`.toUpperCase(),
    version: '1.0.0',
    swaggerHtmlEndpoint: '/swagger-html',
    swaggerJsonEndpoint: '/swagger-json'
  });
}
// Get routes
getRoutes().map((x: object) => router.map(x, {}));

export default router;
