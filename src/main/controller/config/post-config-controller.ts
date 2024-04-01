import { HttpRequest } from '../../../domain/protocols/http-request';
import { HttpResponse } from '../../../domain/protocols/http-response';
import { Handler } from '../../core/handler';
import { template } from '../../helpers/http-helpers';
import { PostConfig } from '../../../domain/params/post-config';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{12,}$/;

export class PostConfigController extends Handler {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const configParse = PostConfig.safeParse(request.body);
    if (!configParse.success) {
      const content = await this.templateRenderer.render('config', {
        error: 'Invalid config'
      });
      return template(content);
    }
    const { username, password, passwordConfirm } = configParse.data;

    if (password !== passwordConfirm) {
      const content = await this.templateRenderer.render('config', {
        error: 'Passwords do not match'
      });
      return template(content);
    }

    if (!PASSWORD_REGEX.test(password)) {
      const content = await this.templateRenderer.render('config', {
        error:
          'Password must have at least 12 characters, at least one uppercase letter, at least one lowercase letter and at least one number'
      });
      return template(content);
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
