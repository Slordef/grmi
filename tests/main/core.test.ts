import { expect } from '@jest/globals';
import { createCore } from '../behavior/create-core';

describe('Core', () => {
    it('should be able to start', () => {
        const app = createCore();
        expect(app).toBeDefined();
        app.run();
    });
});