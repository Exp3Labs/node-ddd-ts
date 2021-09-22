import jsonwebtoken from 'jsonwebtoken';
import { injectable } from 'inversify';
import { JWT } from '@/shared/domain/jwt/jwt';
import { JwtSecret } from '@/shared/domain/jwt/jwt.secret';

@injectable()
export class JSONWebToken implements JWT {
  constructor(private readonly secretKey: string) {}

  async sign(data: object): Promise<JwtSecret> {
    try {
      const token = await jsonwebtoken.sign(data, this.secretKey);
      return new JwtSecret(token, true);
    } catch (error: any) {
      return new JwtSecret(error.toString(), false);
    }
  }

  async verify(token: JwtSecret): Promise<any> {
    try {
      return await jsonwebtoken.verify(token.getSecret(), this.secretKey);
    } catch (error) {
      return { error };
    }
  }
}
