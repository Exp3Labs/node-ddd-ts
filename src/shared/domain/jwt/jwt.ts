import JwtSecret from '@/shared/domain/jwt/jwt.secret';
// Ports (actions to do)
export default interface JWT {
  sign(data: object): Promise<JwtSecret>;
  verify(token: JwtSecret): Promise<any>;
}
