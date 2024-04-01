import { TestRunManager } from './test-run-manager';
import { AppCorePlugin } from '../../../../src/domain/core/app-core-plugin';
import { AppCorePluginManager } from '../../../../src/domain/core/app-core-plugin-manager';

export function createTestRunManagerPlugin(mock = jest.fn(), testRunManager = TestRunManager) {
  class TestRunManagerPlugin implements AppCorePlugin {
    install(manager: AppCorePluginManager) {
      manager.register('RunManager', new testRunManager(mock));
    }
  }
  return TestRunManagerPlugin;
}
