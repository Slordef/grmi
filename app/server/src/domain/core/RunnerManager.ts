import { RunnerContainer } from './RunnerContainer';

export class RunnerManager {
    private maxRunner = 5;
    private runnerContainers: RunnerContainer[] = [];
    private runningContainers: RunnerContainer[] = [];
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
        this.runningContainers = this.runningContainers.filter((runnerContainer) => runnerContainer !== runner);
    }

    private loop(): void {
        if (this.runnerContainers.length > 0 && this.runningContainers.length < this.maxRunner) {
            const runner = this.runnerContainers.shift();
            if (runner) {
                this.runningContainers.push(runner);
                runner.queue();
            }
        }
    }


}