import { ExpressPlugin } from '../../../../app/server/src/infra/api/express';
import { mocking } from '../../../behavior/test-core-plugin-manager';

describe('Express Install', () => {
    it('should be able to install express', () => {
        const mock = jest.fn();
        const pluginManager = mocking(mock);
        const plugin = new ExpressPlugin();
        plugin.install(pluginManager);
        expect(mock).toBeCalled();
    });
});