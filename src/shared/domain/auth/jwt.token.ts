export class JWTToken {
  constructor(private token: string, private isValid: boolean) {}

  getToken(): string {
    return this.token;
  }
  getIsValid(): boolean {
    return this.isValid;
  }
}
