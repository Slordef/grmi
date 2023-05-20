import { RunManager } from '../../src/domain/usecases/run-manager';

export class TestRunnerManager implements RunManager {
    constructor(
		private readonly mock = jest.fn()
    ) {
    }

    createRunnerContainer(id: number, url: string, token: string, name: string, labels: string[]) {
        this.mock(id, url, token, name, labels);
    }
}