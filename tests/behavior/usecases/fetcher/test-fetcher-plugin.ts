import { FetcherOptions } from '../../../../src/domain/usecases/fetcher/fetcher';
import { TestFetcher } from './test-fetcher';
import { AppCorePlugin } from '../../../../src/domain/core/app-core-plugin';
import { AppCorePluginManager } from '../../../../src/domain/core/app-core-plugin-manager';
import { FetchResponse } from '../../../../src/domain/protocols/fetch-response';

export function createTestFetcherPlugin(
  mock: jest.Mock<Promise<FetchResponse>, [url: string, options?: FetcherOptions]> = jest.fn(
    (url: string, options?: FetcherOptions) =>
      Promise.resolve({
        status: 200,
        body: { url, options }
      })
  ),
  testFetcher = TestFetcher
) {
  class TestFetcherPlugin implements AppCorePlugin {
    install(manager: AppCorePluginManager): void {
      manager.register('Fetcher', new testFetcher(mock));
    }
  }
  return TestFetcherPlugin;
}
