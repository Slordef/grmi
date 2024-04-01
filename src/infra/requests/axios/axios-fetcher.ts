import { Fetcher, FetcherOptions } from '../../../domain/usecases/fetcher/fetcher';
import axios from 'axios';
import { FetchResponse } from '../../../domain/protocols/fetch-response';

export class AxiosFetcher implements Fetcher {
  async fetch(url: string, options?: FetcherOptions): Promise<FetchResponse> {
    const resp = await axios.request({
      url,
      method: options?.method || 'GET',
      headers: options?.headers || {}
    });
    return {
      body: resp.data,
      status: resp.status
    };
  }
}
