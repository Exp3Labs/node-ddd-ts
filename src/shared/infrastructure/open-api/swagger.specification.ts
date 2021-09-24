import { SwaggerRouter } from 'koa-swagger-decorator';
import { getRoutes } from '@/shared/infrastructure/bootstrap/import.system';
import { PROJECT, SWAGGER } from '@/shared/infrastructure/config';

const router = new SwaggerRouter();

if (SWAGGER.isPublic === 'true') {
  router.swagger({
    title: PROJECT.name,
    description: `.ENV: ${PROJECT.mode}`.toUpperCase(),
    version: '1.0.0',
    swaggerHtmlEndpoint: SWAGGER.html,
    swaggerJsonEndpoint: SWAGGER.json
  });
}
// Get routes
getRoutes().map((x: object) => router.map(x, {}));

export default router;
