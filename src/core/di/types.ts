const TYPES = {
  // infrastructure
  DogRepository: Symbol.for('DogRepository'),
  // application
  DogCreate: Symbol.for('DogCreate'),
  DogFind: Symbol.for('DogFind'),
  DogUpdate: Symbol.for('DogUpdate')
};

export { TYPES };
