import jsonwebtoken from 'jsonwebtoken';
import { injectable } from 'inversify';
import { JWT } from '@/shared/domain/auth/jwt';
import { JWTToken } from '@/shared/domain/auth/jwt.token';

@injectable()
export class JSONWebToken implements JWT {
  constructor(private readonly secretKey: string) {}

  async sign(data: object): Promise<JWTToken> {
    try {
      const token = await jsonwebtoken.sign(data, this.secretKey);
      return new JWTToken(token, true);
    } catch (error: any) {
      return new JWTToken(error.toString(), false);
    }
  }

  async verify(token: JWTToken): Promise<any> {
    try {
      return await jsonwebtoken.verify(token.getToken(), this.secretKey);
    } catch (error) {
      return { error };
    }
  }
}
