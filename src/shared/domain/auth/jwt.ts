import { JWTToken } from '@/shared/domain/auth/jwt.token';

// Ports (actions to do)
export interface JWT {
  sign(data: object): Promise<JWTToken>;
  verify(token: JWTToken): Promise<any>;
}
