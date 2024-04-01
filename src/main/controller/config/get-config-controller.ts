import { HttpResponse } from '../../../domain/protocols/http-response';
import { Handler } from '../../core/handler';
import { template } from '../../helpers/http-helpers';

export class GetConfigController extends Handler {
  async handle(): Promise<HttpResponse> {
    const content = await this.templateRenderer.render('config', {});
    return template(content);
  }
}
