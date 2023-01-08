import { Entity } from '../core/Entity';
import { RunnerEntity } from './RunnerEntity';
import { IRepository } from '../interface/IRepository';

export class RepositoryEntity extends Entity<IRepository> {
    private Runners: RunnerEntity[] = [];

    public addRunner(runner: RunnerEntity): void {
        this.Runners.push(runner);
    }

    public removeRunner(runner: RunnerEntity): void {
        this.Runners.splice(this.Runners.indexOf(runner), 1);
    }
}