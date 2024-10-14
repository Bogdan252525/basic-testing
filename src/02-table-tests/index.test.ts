import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 8, b: 6, action: Action.Subtract, expected: 2 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 3, b: 5, action: Action.Multiply, expected: 15 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 2, b: 'somethingElse', action: Action.Add, expected: null },
  { a: 'somethingElse', b: 2, action: Action.Multiply, expected: null },
  { a: 2, b: 3, action: 'somethingElse', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return expected outcome',
    ({ a, b, action, expected }) => {
      const outcome = simpleCalculator({ a, b, action });
      expect(outcome).toBe(expected);
    },
  );
});
