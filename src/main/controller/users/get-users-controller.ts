import { Handler } from '../../core/handler';
import { HttpResponse } from '../../../domain/protocols/http-response';
import { template } from '../../helpers/http-helpers';
import { propInObject } from '../../helpers/prop-in-object';
import { HttpRequest } from '../../../domain/protocols/http-request';

export class GetUsersController extends Handler {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const userList = await this.userRepository.list();
    const users = userList.map((user) => ({
      id: user.id,
      name: user.name,
      login: user.login,
      email: user.email,
      token: user.token
    }));
    let success = undefined;
    if (propInObject(httpRequest.query, 'deleted') && httpRequest.query.deleted === 'true') {
      success = 'User deleted';
    }
    const content = await this.templateRenderer.render('users', {
      page: {
        current: 'users'
      },
      success,
      users
    });
    return template(content);
  }
}
