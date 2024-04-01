import { AppCorePluginManager } from '../../../../src/domain/core/app-core-plugin-manager';
import { TestApiServer } from './test-api-server';
import { AppCorePlugin } from '../../../../src/domain/core/app-core-plugin';
import { jest } from '@jest/globals';

export function createTestApiServerPlugin(
  mock = jest.fn(),
  apiServer = TestApiServer
): { new (): AppCorePlugin } {
  class TestApiServerPlugin implements AppCorePlugin {
    install(manager: AppCorePluginManager): void {
      manager.register('ApiServer', new apiServer(mock));
    }
  }
  return TestApiServerPlugin;
}
