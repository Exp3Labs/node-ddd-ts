export class UUIDInvalid extends Error {
  constructor(uuid: string) {
    super(`The UUID ${uuid} is invalid`);
  }
}
