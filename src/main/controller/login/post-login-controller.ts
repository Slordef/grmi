import { HttpRequest } from '../../../domain/protocols/http-request';
import { HttpResponse } from '../../../domain/protocols/http-response';
import { Handler } from '../../core/handler';
import { ok, unauthorized } from '../../helpers/http-helpers';
import { Login } from '../../../domain/params/login';

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

    return ok({ token });
  }
}
