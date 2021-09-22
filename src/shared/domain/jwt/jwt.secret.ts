export class JwtSecret {
  constructor(private secret: string, private isValid: boolean) {}

  getSecret(): string {
    return this.secret;
  }
  getIsValid(): boolean {
    return this.isValid;
  }
}
