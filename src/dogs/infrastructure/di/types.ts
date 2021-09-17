const TYPES = {
  // infrastructure
  DogRepository: Symbol.for('DogRepository'),
  // application
  DogCreate: Symbol.for('DogCreate'),
  DogFind: Symbol.for('DogFind'),
  DogFindAll: Symbol.for('DogFindAll'),
  DogUpdate: Symbol.for('DogUpdate'),
  DogDelete: Symbol.for('DogDelete')
};

export { TYPES };
