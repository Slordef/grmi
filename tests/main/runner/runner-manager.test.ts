import { TestFetcher } from '../../behavior/usecases/fetcher/test-fetcher';
import { RunnerManager } from '../../../src/main/runner/runner-manager';
import { FetcherOptions } from '../../../src/domain/usecases/fetcher/fetcher';
import { FetchResponse } from '../../../src/domain/protocols/fetch-response';

const mockSpawn = jest.fn<
  {
    stdout: boolean;
    stderr: boolean;
    message: string;
  },
  unknown[]
>(() => ({
  stdout: true,
  stderr: false,
  message: 'test'
}));
const mockFetch: jest.Mock<
  Promise<FetchResponse>,
  [url: string, options?: FetcherOptions]
> = jest.fn((url: string, options?: FetcherOptions) =>
  Promise.resolve({
    status: 200,
    body: {
      url,
      options
    }
  })
);
const called = {
  spawn: () => {}
};
jest.mock('child_process', () => ({
  spawn: (...args: unknown[]) => {
    const res = mockSpawn(...args);
    called.spawn();
    return {
      stdout: {
        on: (c: string, d: (data: string) => void) => {
          if (res.stdout) d(res.message);
        }
      },
      stderr: {
        on: (c: string, d: (data: string) => void) => {
          if (res.stderr) d(res.message);
        }
      }
    };
  }
}));

describe('RunnerManager', () => {
  it('should build docker runner', async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        body: {
          body: `
            https://github.com/actions/runner/releases/download/v1.111.1/actions-runner-linux-x64-1.111.1.tar.gz
            <!-- BEGIN SHA linux-x64 -->123456789<!-- END SHA linux-x64 -->
				  `
        }
      })
    );
    new RunnerManager(new TestFetcher(mockFetch));
    await new Promise<void>((r) => {
      called.spawn = r;
    });
    expect(mockFetch).toBeCalledTimes(1);
    expect(mockFetch).toBeCalledWith(
      'https://api.github.com/repos/actions/runner/releases/latest',
      undefined
    );
    expect(mockSpawn).toBeCalledTimes(1);
    expect(mockSpawn).toBeCalledWith(
      'docker',
      [
        'build',
        '-t',
        'runner',
        '-f',
        './docker/Dockerfile_v2',
        '--build-arg',
        'GITHUB_RUNNER_VERSION=1.111.1',
        '--build-arg',
        'GITHUB_RUNNER_CHECKSUMS=123456789',
        '.'
      ],
      { shell: true }
    );
    // manager.createRunnerContainer(
    //     123,
    //     'node',
    //     'token-123',
    //     'runner-123',
    //     ['test-1', 'self-hosted']
    // );
  });
});
