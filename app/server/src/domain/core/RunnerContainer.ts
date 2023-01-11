import { exec, spawn } from 'child_process';
import { RunnerManager } from './RunnerManager';

export class RunnerContainer {
    public manager?: RunnerManager;
    private dockerID = '';
    private running = false;
    private removed = false;
    private timeout?: NodeJS.Timeout;

    constructor(
        private readonly id: number,
        private readonly url: string,
        private readonly token: string,
        private readonly name: string,
        private readonly labels: string[],
    ) {
    }

    queue(): void {
        const ps = spawn('docker', [
            'run', '-d',
            '-v', '/var/run/docker.sock:/var/run/docker.sock:rw',
            '-e', `GITHUB_REPOSITORY_URL=${this.url}`,
            '-e', `GITHUB_RUNNER_TOKEN=${this.token}`,
            '-e', `GITHUB_RUNNER_NAME=${this.name}`,
            '-e', `GITHUB_RUNNER_LABELS=${this.labels.join(',')}`,
            'runner'
        ]);
        ps.stdout.on('data', (data) => {
            if (this.dockerID == '') {
                this.dockerID = data.toString().slice(0, 3);
                console.log(this.dockerID);
                const lg = spawn('docker', [
                    'logs', '-f', this.dockerID
                ]);
                lg.stdout.on('data', (data) => {
                    console.log(data.toString());
                    if (data.toString().includes('Removed .runner') || data.toString().includes('Removing .runner')) {
                        this.removed = true;
                    }
                    if (data.toString().includes('Running job:')) {
                        this.running = true;
                    }
                    if (data.toString().includes('Exiting runner') && this.running) {
                        if (this.removed) return this.remove();
                        if (this.running) this.complete();
                    }
                });
                lg.stderr.on('data', (data) => {
                    console.log(data.toString());
                });
            }
        });
        this.timeout = setTimeout(() => {
            if (!this.running) this.complete();
        });
    }

    in_progress(): void {
        // nothing to do
    }

    complete(): void {
        exec(`docker exec ${this.dockerID} bash -c "/home/runner/actions-runner/config.sh remove --token ${this.token}"`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                // err
            }
            console.log(`stdout: ${stdout}`);
            if (stdout.toString().includes('Removed .runner') || stdout.toString().includes('Removing .runner')) {
                this.remove();
            }
        });
    }

    remove(): void {
        clearTimeout(this.timeout);
        spawn('docker', [
            'rm', '-f', this.dockerID
        ]);
        this.manager?.removeRunningContainer(this);
    }
}