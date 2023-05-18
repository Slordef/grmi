import { Fetcher } from '../../app/server/src/domain/request/fetcher';

export class TestFetcher implements Fetcher {
    constructor(
		private readonly resolving: () => any = () => undefined
    ) {
    }

    async fetch(url: string, options?: any): Promise<any> {
        return Promise.resolve(this.resolving());
    }

}