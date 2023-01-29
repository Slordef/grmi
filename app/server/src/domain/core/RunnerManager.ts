import { RunnerContainer } from './RunnerContainer';
import { spawn } from 'child_process';

export class RunnerManager {
    private maxRunner = 5;
    private runnerContainers: RunnerContainer[] = [];
    private runingContainers: RunnerContainer[] = [];
    private interval: NodeJS.Timeout | undefined;

    constructor() {
        this.interval = setInterval(() => {
            this.loop();
        }, 1000);
    }

    createRunnerContainer(
        id: number,
        url: string,
        token: string,
        name: string,
        labels: string[],
    ): void {
        const runner = new RunnerContainer(id, url, token, name, labels);
        runner.manager = this;
        this.runnerContainers.push(runner);
    }

    removeRunningContainer(runner: RunnerContainer): void {
        console.log('Remove Running Container');
        this.runingContainers = this.runingContainers.filter((runnerContainer) => runnerContainer !== runner);
        console.log('Running Count : ', this.runingContainers.length);
    }

    public setupDockerImage(): void {
        const ps = spawn('docker', [
            'build',
            '-t', 'runner',
            '-f', './docker/Dockerfile',
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
                runner.queue();
                console.log('Running Count : ', this.runingContainers.length);
            }
        }
    }

}