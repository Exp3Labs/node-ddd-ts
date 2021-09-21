import 'reflect-metadata';

declare let global: any;

beforeAll(async () => {
  global.example = 'test';
});

describe('Setup tests', () => {
  it('should set global variables', async () => {
    expect(global.example).toBe('test');
  });
});
