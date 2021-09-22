import { TYPES } from '@/shared/infrastructure/d-injection/types';
import { JWT } from '@/shared/domain/jwt/jwt';
import { JwtSecret } from '@/shared/domain/jwt/jwt.secret';
import { AppContainer } from '@/shared/infrastructure/d-injection';

export const isAuth = async (ctx: any, next: Function) => {
  try {
    const jwt = AppContainer.get<JWT>(TYPES.JWT);
    const token = ctx.request.header.authorization;
    if (token) {
      ctx.request.header.authorization = `Bearer ${token}`;

      const decoded: any = await jwt.verify(new JwtSecret(token, true));

      if (!decoded?.error) {
        ctx.req.user = decoded;
        await next();
      } else {
        ctx.status = 401;
        ctx.app.emit('error', 'Unauthorized', ctx);
      }
    } else {
      ctx.status = 403;
      ctx.app.emit('error', 'Forbidden', ctx);
    }
  } catch (error: any) {
    ctx.status = 400;
    ctx.app.emit('error', 'Bad Request', ctx);
  }
};
