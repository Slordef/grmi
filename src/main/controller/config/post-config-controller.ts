import { HttpRequest } from '../../../domain/protocols/http-request';
import { HttpResponse } from '../../../domain/protocols/http-response';
import { Handler } from '../../core/handler';
import { badRequest, template } from '../../helpers/http-helpers';
import { PostConfig } from '../../../domain/params/post-config';

export class PostConfigController extends Handler {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const configParse = PostConfig.safeParse(request.body);
    if (!configParse.success) {
      return badRequest(new Error('Invalid config'));
    }
    const { username, password, passwordConfirm } = configParse.data;

    if (password !== passwordConfirm) {
      return badRequest(new Error('Passwords do not match'));
    }

    const passwordHash = await this.hasher.hash(password);

    const config = { username, password: passwordHash };

    const created = await this.configRepository.create(config);

    const content = await this.templateRenderer.render('config_created', {
      username: created.username
    });

    return template(content);
  }
}
