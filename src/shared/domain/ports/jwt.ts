import JwtSecret from '@/shared/domain/jwt.secret';
// Ports (actions to do)
export default interface JWT {
  sign(data: object): Promise<JwtSecret>;
  verify(token: JwtSecret): Promise<any>;
  signature(): string;
}
