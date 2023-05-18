import { FetchResponse } from '../protocols/fetch-response';

export interface Fetcher {
	fetch(url: string, options?: any): Promise<FetchResponse>;
}