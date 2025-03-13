import { ApplicationCore } from '../../../src/main/core/application-core';
import { AppCorePlugin } from '../../../src/domain/core/app-core-plugin';
import { AppCorePluginManager } from '../../../src/domain/core/app-core-plugin-manager';

describe('Application Core', () => {
  test('should be able to receive plugins', () => {
    const mock = jest.fn(() => 'test');
    class RandomPlugin implements AppCorePlugin {
      install(manager: AppCorePluginManager): void {
        manager.register('Test', mock);
      }
    }
    const core = new ApplicationCore(RandomPlugin);
    const testFunction = core.adapter('Test');
    expect(testFunction()).toBe('test');
  });
});
