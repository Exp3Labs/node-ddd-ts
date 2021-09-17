import JwtSecret from '../jwt.secret';
// Ports (actions to do)
export default interface JWT {
  sign(data: object): Promise<JwtSecret>;
  verify(token: JwtSecret): Promise<any>;
  signature(): string;
}
