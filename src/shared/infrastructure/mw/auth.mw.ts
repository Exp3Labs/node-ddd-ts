import { TYPES } from '@/shared/infrastructure/di/types';
import JWT from '@/shared/domain/ports/jwt';
import JWTSecret from '@/shared/domain/jwt.secret';
import AppContainer from '@/shared/infrastructure/di/config';

// @injectable()
// export default class isAuth {
//   constructor(
//     @inject(TYPES.JWT) private readonly jwt: JWT,
//     private readonly ctx: Context,
//     private readonly next: Function
//   ) {}

//   public async handle() {
//     const token = this.ctx.request.headers['authorization'];
//     if (!token) {
//       this.ctx.status = 401;
//       this.ctx.body = {
//         message: 'No token provided'
//       };
//       return;
//     }

//     const decoded = this.jwt.verify(new JWTSecret(token, true));

//     if (!decoded) {
//       this.ctx.status = 401;
//       this.ctx.body = {
//         message: 'Invalid token'
//       };
//       return;
//     }

//     this.ctx.state.user = decoded;
//     await this.next();
//   }
// }

export const isAuth = async (ctx: any, next: Function) => {
  try {
    const jwt = AppContainer.get<JWT>(TYPES.JWT);
    const token = ctx.request.header.authorization;
    if (token) {
      ctx.request.header.authorization = `Bearer ${token}`;

      const decoded: any = await jwt.verify(new JWTSecret(token, true));

      if (!decoded?.error) {
        ctx.req.user = decoded;
        await next();
      } else {
        throw 'Bad signature';
      }
    } else {
      throw 'Unauthorized';
    }
  } catch (error: any) {
    ctx.throw(401, error);
  }
};
