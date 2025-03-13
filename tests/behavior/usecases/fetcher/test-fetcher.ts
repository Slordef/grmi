import { Fetcher, FetcherOptions } from '../../../../src/domain/usecases/fetcher/fetcher';
import { FetchResponse } from '../../../../src/domain/protocols/fetch-response';

export class TestFetcher implements Fetcher {
  constructor(
    private readonly mock: jest.Mock<
      Promise<FetchResponse>,
      [url: string, options?: FetcherOptions]
    >
  ) {}
  async fetch(url: string, options?: FetcherOptions): Promise<FetchResponse> {
    return this.mock(url, options);
  }
}
