import { FetchResponse } from '../../protocols/fetch-response';

export interface FetcherOptions {
  method?: string;
  headers?: Record<string, string>;
}

export interface Fetcher {
  fetch(url: string, options?: FetcherOptions): Promise<FetchResponse>;
}
