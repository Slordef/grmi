import { Handler } from '../core/handler';
import { HttpRequest } from '../../domain/protocols/http-request';
import { HttpResponse } from '../../domain/protocols/http-response';
import { ok, redirect } from '../helpers/http-helpers';

export class UserMiddleware extends Handler {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if ((await this.configRepository.list()).length === 0) return redirect('/config');
    if (!('token' in httpRequest.cookies)) return redirect('/login');

    // get token
    const token = httpRequest.headers.authorization;
    if (typeof token !== 'string') return ok({});

    // verify token
    const isValid = await this.tokenVerifier.verify(token);
    console.log('isValid', isValid);
    if (!isValid) return ok({});

    // get username
    // const username = this.tokenVerifier.decode(token);

    // const userList = await this.configRepository.list();
    // const user = userList.find((user) => user.token === httpRequest.headers.authorization);
    return ok({
      user: {
        username: ''
      }
    });
  }
}
