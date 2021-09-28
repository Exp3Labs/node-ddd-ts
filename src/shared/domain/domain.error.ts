export class DomainError extends Error {
  constructor(private readonly errorMessage: string) {
    super(errorMessage);
  }

  public getErrorMessage(): string {
    return this.errorMessage;
  }
}
