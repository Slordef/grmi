import { expect } from '@jest/globals';
import { createCore } from '../behavior/create-core';

describe('Core', () => {
    const app = createCore();
    it('should be able to start', () => {
        expect(app).toBeDefined();
        expect(() => app.run()).not.toThrowError();
    });
});