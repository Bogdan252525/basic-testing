import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const outcome = simpleCalculator({ a: 3, b: 4, action: Action.Add });
    expect(outcome).toBe(7);
  });

  test('should subtract two numbers', () => {
    const outcome = simpleCalculator({ a: 6, b: 4, action: Action.Subtract });
    expect(outcome).toBe(2);
  });

  test('should multiply two numbers', () => {
    const outcome = simpleCalculator({ a: 3, b: 8, action: Action.Multiply });
    expect(outcome).toBe(24);
  });

  test('should divide two numbers', () => {
    const outcome = simpleCalculator({ a: 9, b: 3, action: Action.Divide });
    expect(outcome).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const outcome = simpleCalculator({
      a: 4,
      b: 2,
      action: Action.Exponentiate,
    });
    expect(outcome).toBe(16);
  });

  test('should return null for invalid action', () => {
    const outcome = simpleCalculator({ a: 3, b: 5, action: 'somethingElse' });
    expect(outcome).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const outcome = simpleCalculator({ a: true, b: 5, action: Action.Divide });
    expect(outcome).toBeNull();
  });
});
