import { RunnerContainer } from './RunnerContainer';
import { spawn } from 'child_process';
import { Core } from '../core/Core';

export class RunnerManager {
    private maxRunner = 5;
    private runnerContainers: RunnerContainer[] = [];
    private runingContainers: RunnerContainer[] = [];
    private interval: NodeJS.Timeout | undefined;
    private intervalCheckVersion: NodeJS.Timer | undefined;

    constructor(
        private readonly core: Core,
    ) {
        this.interval = setInterval(() => {
            this.loop();
        }, 1000);
        this.intervalCheckVersion = setInterval(() => {
            this.checkVersionRunner();
        }, 1000 * 60 * 60);
    }

    createRunnerContainer(
        id: number,
        url: string,
        token: string,
        name: string,
        labels: string[],
    ): void {
        const runner = new RunnerContainer(this, id, url, token, name, labels);
        this.runnerContainers.push(runner);
    }

    removeRunningContainer(runner: RunnerContainer): void {
        console.log('Remove Running Container');
        this.runingContainers = this.runingContainers.filter((runnerContainer) => runnerContainer !== runner);
        console.log('Running Count : ', this.runingContainers.length);
    }

    checkVersionRunner(): void {
        this.core.adapter.fetch('https://api.github.com/repos/actions/runner/releases/latest').then((res: any) => {
            console.log(res.body.body);
            const searchVersion = /https:\/\/github.com\/actions\/runner\/releases\/download\/[v.0-9]+\/actions-runner-linux-x64-([.0-9]+)\.tar\.gz/;
            const searchChecksums = /<!-- BEGIN SHA linux-x64 -->(.*)<!-- END SHA linux-x64 -->/;
            const matchChecksums = res.body.body.match(searchChecksums);
            let checksums: string | undefined;
            let version: string | undefined;
            if (matchChecksums) {
                checksums = matchChecksums[1];
                console.log('Checksums: ', checksums);
            }
            const matchVersion = res.body.body.match(searchVersion);
            if (matchVersion) {
                version = matchVersion[1];
                console.log('Version: ', version);
            }
            if (version && checksums) {
                this.setupDockerImage(version, checksums);
            }
        });
        clearInterval(this.intervalCheckVersion);
    }

    public setupDockerImage(version: string, checksums: string): void {
        const ps = spawn('docker', [
            'build',
            '-t', 'runner',
            '-f', '../../docker/Dockerfile',
            '--build-arg', `GITHUB_RUNNER_VERSION=${version}`,
            '--build-arg', `GITHUB_RUNNER_CHECKSUMS=${checksums}`,
            '.'
        ]);
        ps.stdout.on('data', (data) => {
            console.log(data.toString());
        });
        ps.stderr.on('data', (data) => {
            console.log(data.toString());
        });
    }

    private loop(): void {
        if (this.runnerContainers.length > 0 && this.runingContainers.length < this.maxRunner) {
            const runner = this.runnerContainers.shift();
            if (runner) {
                console.log('Add Running Container');
                this.runingContainers.push(runner);
                runner.run();
                console.log('Running Count : ', this.runingContainers.length);
            }
        }
    }

}