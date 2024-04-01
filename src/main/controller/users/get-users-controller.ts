import { Handler } from '../../core/handler';
import { HttpResponse } from '../../../domain/protocols/http-response';
import { template } from '../../helpers/http-helpers';

export class GetUsersController extends Handler {
  async handle(): Promise<HttpResponse> {
    const userList = await this.userRepository.list();
    const users = userList.map((user) => ({
      id: user.id,
      name: user.name,
      login: user.login,
      email: user.email,
      token: user.token
    }));
    const content = await this.templateRenderer.render('users', {
      page: {
        current: 'users'
      },
      users
    });
    return template(content);
  }
}
