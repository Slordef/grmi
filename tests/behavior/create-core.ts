import { Core } from '../../src/main/core/core';
import { TestApiServerPlugin } from './test-api-server-plugin';
import { TestDatabaseSystemPlugin } from './test-database-system-plugin';
import { TestFetcherPlugin } from './test-fetcher-plugin';
import { TestApiServer } from './test-api-server';
import { TestRepository } from './test-repository';
import { Repository } from '../../src/domain/database/params/repository';
import { User } from '../../src/domain/database/params/user';
import { TestFetcher } from './test-fetcher';

export function createCore(
    testApiServer: TestApiServer = new TestApiServer(),
    testRepository: TestRepository<Repository> = new TestRepository<Repository>(),
    testUserRepository: TestRepository<User> = new TestRepository<User>(),
    testFetcher: TestFetcher = new TestFetcher()
) {
    return new Core(
        new TestApiServerPlugin(
            testApiServer
        ),
        new TestDatabaseSystemPlugin(
            testRepository,
            testUserRepository
        ),
        new TestFetcherPlugin(
            testFetcher
        )
    );
}