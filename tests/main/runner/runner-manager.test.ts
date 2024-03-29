/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function */
const mockSpawn = jest.fn((...args: any[]) => ({
  stdout: true,
  stderr: false,
  message: 'test'
}));
const mockFetch = jest.fn();
const called = {
  spawn: () => {}
};
jest.mock('child_process', () => ({
  spawn: (...args: any[]) => {
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
import { expect } from '@jest/globals';
import { RunnerManager } from '../../../src/main/runner/runner-manager';
import { TestFetcher } from '../../behavior/test-fetcher';

describe('RunnerManager', () => {
  it('should build docker runner', async () => {
    mockFetch.mockReturnValueOnce({
      body: {
        body: `
				https://github.com/actions/runner/releases/download/v1.111.1/actions-runner-linux-x64-1.111.1.tar.gz
				<!-- BEGIN SHA linux-x64 -->123456789<!-- END SHA linux-x64 -->
				`
      }
    });
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
