import { RunnerContainer } from './runner-container';
import { Fetcher } from '../../domain/usecases/fetcher/fetcher';
import { log } from '../helpers/logger';
import { ResponseGithubAPITakeLatestVersionOfRunner } from '../../domain/params/response-github-api';
import { Spawning } from './spawning';
import { RunManager } from '../../domain/usecases/runner/run-manager';

export class RunnerManager implements RunManager {
  private maxRunner = 5;
  private runnerContainers: RunnerContainer[] = [];
  private runningContainers: RunnerContainer[] = [];
  private interval: NodeJS.Timeout | undefined;
  private intervalCheckVersion: NodeJS.Timer | undefined;

  constructor(private readonly fetcher: Fetcher) {
    // this.init(); // TODO: Uncomment this line
  }

  init(): void {
    this.interval = setInterval(() => {
      this.loop();
    }, 1000);
    setTimeout(() => {
      this.checkVersionRunner();
    }, 1000);
    this.intervalCheckVersion = setInterval(
      () => {
        this.checkVersionRunner();
      },
      1000 * 60 * 60 * 24
    );
  }

  createRunnerContainer(
    id: number,
    url: string,
    token: string,
    name: string,
    labels: string[]
  ): void {
    const runner = new RunnerContainer(this, id, url, token, name, labels);
    this.runnerContainers.push(runner);
  }

  removeRunningContainer(runner: RunnerContainer): void {
    log('Remove Running Container');
    this.runningContainers = this.runningContainers.filter(
      (runnerContainer) => runnerContainer !== runner
    );
    log('Running Count : ', this.runningContainers.length);
  }

  checkVersionRunner(): void {
    this.fetcher
      .fetch('https://api.github.com/repos/actions/runner/releases/latest')
      .then((res: unknown) => {
        try {
          const resp = ResponseGithubAPITakeLatestVersionOfRunner.parse(res);
          if (!resp.body) {
            return;
          }
          // Validate response and parse
          log(resp.body.body);
          const searchVersion =
            /https:\/\/github.com\/actions\/runner\/releases\/download\/[v.0-9]+\/actions-runner-linux-x64-([.0-9]+)\.tar\.gz/;
          const searchChecksums = /<!-- BEGIN SHA linux-x64 -->(.*)<!-- END SHA linux-x64 -->/;
          const matchChecksums = resp.body.body.match(searchChecksums);
          let checksums: string | undefined;
          let version: string | undefined;
          if (matchChecksums) {
            checksums = matchChecksums[1];
            log('Checksums: ', checksums);
          }
          const matchVersion = resp.body.body.match(searchVersion);
          if (matchVersion) {
            version = matchVersion[1];
            log('Version: ', version);
          }
          if (version && checksums) {
            this.setupDockerImage(version, checksums);
          }
        } catch (e) {
          log('Error: ', e);
          return;
        }
      });
  }

  public setupDockerImage(version: string, checksums: string): void {
    const ps = new Spawning(
      'docker',
      [
        'build',
        '-t',
        'runner',
        '-f',
        './docker/Dockerfile_v2',
        '--build-arg',
        `GITHUB_RUNNER_VERSION=${version}`,
        '--build-arg',
        `GITHUB_RUNNER_CHECKSUMS=${checksums}`,
        '.'
      ],
      { shell: true }
    );
    ps.stdout(log);
    ps.stderr(log);
  }

  private loop(): void {
    if (this.runnerContainers.length > 0 && this.runningContainers.length < this.maxRunner) {
      const runner = this.runnerContainers.shift();
      if (runner) {
        log('Add Running Container');
        this.runningContainers.push(runner);
        runner.run();
        log('Running Count : ', this.runningContainers.length);
      }
    }
  }
}
