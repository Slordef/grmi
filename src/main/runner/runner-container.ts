import { spawn } from 'child_process';
import { RunnerManager } from './runner-manager';
import { log } from '../helpers/logger';

export class RunnerContainer {
    private dockerID = '';
    private timeout?: NodeJS.Timeout;

    constructor(private readonly manager: RunnerManager, private readonly id: number, private readonly url: string, private readonly token: string, private readonly name: string, private readonly labels: string[],) {
    }

    run(): void {
        log(`${this.name} Start Runner`);
        log(`Starting runner ${this.url} ${this.token} ${this.name} ${this.labels.join(',')}`);
        const ps = spawn('docker', ['run', '-d', '-v', '/var/run/docker.sock:/var/run/docker.sock:rw', '-e', `GITHUB_REPOSITORY_URL=${this.url}`, '-e', `GITHUB_RUNNER_TOKEN=${this.token}`, '-e', `GITHUB_RUNNER_NAME=${this.name}`, '-e', `GITHUB_RUNNER_LABELS=${this.labels.join(',')}`, 'runner'], { shell: true });
        ps.stdout.on('data', (data) => {
            if (this.dockerID == '') {
                this.dockerID = data.toString().slice(0, 12);
                log(`${this.name} Start Runner ID: ${this.dockerID}`);
                this.timeout = setInterval(() => {
                    this.check();
                }, 1000);
                const lg = spawn('docker', ['logs', '-f', this.dockerID], { shell: true });
                lg.stdout.on('data', (data) => {
                    log(data.toString());
                });
                lg.stderr.on('data', (data) => {
                    log(data.toString());
                });
            }
        });
        ps.stderr.on('data', () => {
            log(`${this.name} Error Runner`);
            this.remove();
        });
    }

    check(): void {
        log(`Check Runner ${this.dockerID}`);
        const ps = spawn('docker', ['ps', '-a', '--filter', `id=${this.dockerID}`, '|', 'grep', 'Exited'], { shell: true });
        ps.stdout.on('data', (data) => {
            log(`Check Runner ${this.dockerID} : ${data.toString()}`);
            if (data.toString().includes('Exited')) {
                this.remove();
            }
        });
    }

    remove(): void {
        log(`${this.name} Remove Runner`);
        clearInterval(this.timeout);
        spawn('docker', ['rm', '-f', this.dockerID], { shell: true });
        this.manager.removeRunningContainer(this);
    }
}