import { Core } from '../../app/server/src/main/core/core';
import { TestApiServerPlugin } from './test-api-server-plugin';
import { TestCurlRequestPlugin } from './test-curl-request-plugin';
import { TestDatabaseSystemPlugin } from './test-database-system-plugin';
import { TestFetcherPlugin } from './test-fetcher-plugin';

export function createCore() {
    return new Core(TestApiServerPlugin, TestCurlRequestPlugin, TestDatabaseSystemPlugin, TestFetcherPlugin);
}