import { Fetcher, FetcherOptions } from '../../src/domain/request/fetcher';
import { FetchResponse } from '../../src/domain/protocols/fetch-response';

export class TestFetcher implements Fetcher {
    constructor(
		private readonly resolving: (url: string, options?: FetcherOptions) => FetchResponse = () => ({
		    status: 200,
		    body: undefined
		})
    ) {
    }

    async fetch(url: string, options?: FetcherOptions): Promise<FetchResponse> {
        return Promise.resolve(this.resolving(url, options));
    }

}