import { ApplicationCore } from '../../src/main/core/application-core';
import { createTestApiServerPlugin } from './usecases/api-server/test-api-server-plugin';
import {
  createTestCryptographyHashComparerPlugin,
  createTestCryptographyHasherPlugin,
  createTestCryptographyTokenGeneratorPlugin,
  createTestCryptographyTokenVerifierPlugin
} from './usecases/cryptography/test-cryptography-plugin';
import { createTestFetcherPlugin } from './usecases/fetcher/test-fetcher-plugin';
import {
  createTestConfigRepositoryPlugin,
  createTestRepositoryRepositoryPlugin,
  createTestUserRepositoryPlugin
} from './usecases/repository/test-repository-plugin';
import { createTestRunManagerPlugin } from './usecases/runner/test-run-manager-plugin';
import { AppCorePlugin } from '../../src/domain/core/app-core-plugin';
import { createTestTemplateRendererPlugin } from './usecases/template-renderer/test-template-renderer-plugin';

export function testCreateCore(mock: { [key: string]: { new (): AppCorePlugin } } = {}) {
  mock = Object.assign(
    {
      testApiServerPlugin: createTestApiServerPlugin(),
      testCryptographyHasherPlugin: createTestCryptographyHasherPlugin(),
      testCryptographyHashComparerPlugin: createTestCryptographyHashComparerPlugin(),
      testCryptographyTokenGeneratorPlugin: createTestCryptographyTokenGeneratorPlugin(),
      testCryptographyTokenValidatorPlugin: createTestCryptographyTokenVerifierPlugin(),
      testFetcherPlugin: createTestFetcherPlugin(),
      testUserRepositoryPlugin: createTestUserRepositoryPlugin(),
      testRepositoryRepositoryPlugin: createTestRepositoryRepositoryPlugin(),
      testConfigRepositoryPlugin: createTestConfigRepositoryPlugin(),
      testTemplateRendererPlugin: createTestTemplateRendererPlugin(),
      testRunManagerPlugin: createTestRunManagerPlugin()
    },
    mock
  );
  return new ApplicationCore(...Object.values(mock));
}
