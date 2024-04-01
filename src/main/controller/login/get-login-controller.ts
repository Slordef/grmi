import { HttpRequest } from '../../../domain/protocols/http-request';
import { HttpResponse } from '../../../domain/protocols/http-response';
import { redirect, template } from '../../helpers/http-helpers';
import { Handler } from '../../core/handler';

export class GetLoginController extends Handler {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    if (request.user) {
      return redirect('/');
    }
    const content = await this.templateRenderer.render('login', {});
    return template(content);
  }
}
