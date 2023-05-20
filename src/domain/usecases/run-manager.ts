export interface RunManager {
	createRunnerContainer(id: number, url: string, token: string, name: string, labels: string[]): void;
}