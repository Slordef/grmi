import { CorePlugin } from '../../../domain/core/CorePlugin';
import { PluginRegister } from '../../../domain/core/Core';
import { IFetchRequest, IFetchResponse } from '../../../domain/interface/IFetch';
import axios from 'axios';

export class AxiosRequest extends CorePlugin {
    async install({ register }: PluginRegister): Promise<void> {
        register('fetch', this.fetch);
    }

    async fetch(url: string, options?: IFetchRequest): Promise<IFetchResponse> {
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