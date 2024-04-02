import { HttpRequest } from '../../../domain/protocols/http-request';
import { HttpResponse } from '../../../domain/protocols/http-response';
import { Handler } from '../../core/handler';
import { ok, unauthorized } from '../../helpers/http-helpers';
import { Login } from '../../../domain/params/login';
import { env } from '../../config';

export class PostLoginController extends Handler {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const login = Login.safeParse(httpRequest.body);
    if (!login.success) {
      return unauthorized(new Error('Invalid params'));
    }
    const { username, password } = login.data;

    const userList = await this.configRepository.list();

    const user = userList.find((user) => user.username === username);
    if (!user) return unauthorized(new Error('Unauthorized'));

    const isValid = await this.hashComparer.compare(password, user.password);
    if (!isValid) return unauthorized(new Error('Unauthorized'));

    const token = await this.tokenGenerator.generate(username, '1h');

    return ok({ token }, [
      {
        name: 'token',
        value: token,
        options: {
          httpOnly: true,
          expires: new Date(Date.now() + 3600000),
          maxAge: 3600000,
          secure: env.COOKIE_SECURE,
          sameSite: env.COOKIE_SAME_SITE
        }
      }
    ]);
  }
}
