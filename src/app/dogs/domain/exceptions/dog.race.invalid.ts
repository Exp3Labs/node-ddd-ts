export default class DogRaceInvalid extends Error {
  constructor(race: string) {
    super(`The race ${race} is invalid`);
  }
}
