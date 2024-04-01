import {
  TestConfigRepository,
  TestRepositoryRepository,
  TestUserRepository
} from './test-repository';
import { AppCorePlugin } from '../../../../src/domain/core/app-core-plugin';
import { AppCorePluginManager } from '../../../../src/domain/core/app-core-plugin-manager';
import { jest } from '@jest/globals';

export function createTestUserRepositoryPlugin(
  mock = jest.fn(),
  testUserRepository = TestUserRepository
) {
  class TestUserRepositoryPlugin implements AppCorePlugin {
    install(manager: AppCorePluginManager) {
      manager.register('UserRepository', new testUserRepository(mock));
    }
  }
  return TestUserRepositoryPlugin;
}

export function createTestRepositoryRepositoryPlugin(
  mock: jest.Mock = jest.fn(),
  testRepositoryRepository = TestRepositoryRepository
) {
  class TestRepositoryRepositoryPlugin implements AppCorePlugin {
    install(manager: AppCorePluginManager) {
      manager.register('RepositoryRepository', new testRepositoryRepository(mock));
    }
  }
  return TestRepositoryRepositoryPlugin;
}

export function createTestConfigRepositoryPlugin(
  mock: jest.Mock = jest.fn(),
  testConfigRepository = TestConfigRepository
) {
  class TestConfigRepositoryPlugin implements AppCorePlugin {
    install(manager: AppCorePluginManager) {
      manager.register('ConfigRepository', new testConfigRepository(mock));
    }
  }
  return TestConfigRepositoryPlugin;
}
