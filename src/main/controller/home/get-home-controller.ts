import { Handler } from '../../core/handler';
import { HttpResponse } from '../../../domain/protocols/http-response';
import { template } from '../../helpers/http-helpers';

export class GetHomeController extends Handler {
  async handle(): Promise<HttpResponse> {
    const content = await this.templateRenderer.render('home', {
      page: {
        current: 'dashboard'
      }
    });
    return template(content);
  }
}
