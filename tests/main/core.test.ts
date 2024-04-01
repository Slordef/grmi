import { expect } from '@jest/globals';
import { testCreateCore } from '../behavior/test-create-core';

describe('Core', () => {
  const app = testCreateCore();
  it('should be able to start', () => {
    expect(app).toBeDefined();
    expect(() => app.run([])).not.toThrowError();
  });
});
