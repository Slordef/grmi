import { RunnerManager } from './runner-manager';
import { log } from '../helpers/logger';
import { Spawning } from './spawning';

export class RunnerContainer {
  private dockerID = '';
  private timeout?: NodeJS.Timeout;

  constructor(
    private readonly manager: RunnerManager,
    private readonly id: number,
    private readonly url: string,
    private readonly token: string,
    private readonly name: string,
    private readonly labels: string[]
  ) {}

  run(): void {
    log(`${this.name} Start Runner`);
    log(`Starting runner ${this.url} ${this.token} ${this.name} ${this.labels.join(',')}`);
    const ps = new Spawning(
      'docker',
      [
        'run',
        '-d',
        `--name ${this.name}`,
        '--privileged',
        '-m 4g',
        '--cpus 4',
        `-e GITHUB_REPOSITORY_URL=${this.url}`,
        `-e GITHUB_RUNNER_TOKEN=${this.token}`,
        `-e GITHUB_RUNNER_NAME=${this.name}`,
        `-e GITHUB_RUNNER_LABELS=${this.labels.join(',')}`,
        '-e DOCKER_BUILDKIT=1',
        'runner'
      ],
      { shell: true }
    );
    ps.stdout((data) => {
      if (this.dockerID == '') {
        this.dockerID = data.toString().slice(0, 12);
        this.startRunner();
      }
    });
  }

  startRunner(): void {
    log(`${this.name} Start Runner ID: ${this.dockerID}`);
    this.timeout = setInterval(() => {
      this.check();
    }, 1000);
    const ns = new Spawning(
      'docker',
      [
        'exec',
        this.dockerID,
        `bash -c "/home/runner/bin/Runner.Listener configure --url ${this.url} --token ${this.token} --name ${this.name} --labels ${this.labels.join(',')} --ephemeral && /home/runner/run.sh"`
      ],
      { shell: true }
    );
    ns.stdout(log);
    ns.stderr(log);
    ns.onString('Exiting runner', this.remove.bind(this));
  }

  check(): void {
    log(`Check Runner ${this.dockerID}`);
    const ps = new Spawning('docker', ['ps', '-a', '--filter', `id=${this.dockerID}`], {
      shell: true
    });
    const res = { stdout: '', stderr: '' };
    ps.stdout((data) => {
      res.stdout += data;
    });
    ps.stderr((data) => {
      res.stderr += data;
    });
    ps.onExit(() => {
      if (res.stdout.includes('Exited') || !res.stdout.includes(this.dockerID)) {
        log(res.stdout);
        this.remove();
      }
    });
  }

  remove(): void {
    log(`${this.name} Remove Runner`);
    clearInterval(this.timeout);
    new Spawning('docker', ['rm', '-f', '-v', this.dockerID], { shell: true });
    this.manager.removeRunningContainer(this);
  }
}
