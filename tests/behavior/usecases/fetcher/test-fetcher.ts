import { Fetcher, FetcherOptions } from '../../../../src/domain/usecases/fetcher/fetcher';
import { FetchResponse } from '../../../../src/domain/protocols/fetch-response';
import { jest } from '@jest/globals';

export class TestFetcher implements Fetcher {
  constructor(
    private readonly mock: jest.Mock<
      (url: string, options?: FetcherOptions) => Promise<FetchResponse>
    >
  ) {}
  async fetch(url: string, options?: FetcherOptions): Promise<FetchResponse> {
    return this.mock(url, options);
  }
}
