import { SwaggerRouter } from 'koa-swagger-decorator';
import { getRoutes } from '@/shared/infrastructure/utils/import.util';
import { PROJECT_NAME, PROJECT_MODE } from '@/shared/infrastructure/config';

const router = new SwaggerRouter();

if (PROJECT_MODE !== 'production') {
  router.swagger({
    title: PROJECT_NAME,
    description: 'API DOC',
    version: '1.0.0',
    swaggerHtmlEndpoint: '/swagger-html',
    swaggerJsonEndpoint: '/swagger-json'
  });
}

// Get routes
getRoutes().map((x: object) => router.map(x, {}));

export default router;
