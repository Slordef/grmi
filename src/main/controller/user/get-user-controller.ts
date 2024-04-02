import { Handler } from '../../core/handler';
import { HttpRequest } from '../../../domain/protocols/http-request';
import { HttpResponse } from '../../../domain/protocols/http-response';
import { badRequest, template } from '../../helpers/http-helpers';
import { propInObject } from '../../helpers/prop-in-object';

export class GetUserController extends Handler {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!propInObject<string>(httpRequest.params, 'id')) {
      return badRequest(new Error('Id is required'));
    }
    if (httpRequest.params.id === 'new') {
      const content = await this.templateRenderer.render('user', {
        page: {
          current: 'users'
        },
        user: {
          id: '',
          name: '',
          login: '',
          email: '',
          token: ''
        }
      });
      return template(content);
    }
    const id = parseInt(httpRequest.params.id);
    const user = await this.userRepository.get(id);
    let success = undefined;
    if (propInObject(httpRequest.query, 'created') && httpRequest.query.created === 'true') {
      success = 'User created';
    }
    const content = await this.templateRenderer.render('user', {
      page: {
        current: 'users'
      },
      success,
      user
    });
    return template(content);
  }
}
