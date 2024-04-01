import { Handler } from '../core/handler';
import { HttpResponse } from '../../domain/protocols/http-response';
import { ok, redirect } from '../helpers/http-helpers';

export class ConfigMiddleware extends Handler {
  async handle(): Promise<HttpResponse> {
    if ((await this.configRepository.list()).length > 0) return redirect('/login');
    return ok({});
  }
}
