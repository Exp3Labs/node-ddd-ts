import { injectable } from 'inversify';
import jsonwebtoken from 'jsonwebtoken';
import JWT from '@/shared/domain/ports/jwt';
import { JWT_SECRET_KEY } from '@/shared/infrastructure/config';
import JwtSecret from '@/shared/domain/jwt.secret';

@injectable()
export default class JSONWebToken implements JWT {
  signature(): string {
    return JWT_SECRET_KEY;
  }

  async sign(data: object): Promise<JwtSecret> {
    try {
      const token = await jsonwebtoken.sign(data, this.signature());
      return new JwtSecret(token, true);
    } catch (error: any) {
      return new JwtSecret(error.toString(), false);
    }
  }

  async verify(token: JwtSecret): Promise<any> {
    try {
      return await jsonwebtoken.verify(token.getSecret(), this.signature());
    } catch (error) {
      return { error };
    }
  }
}
