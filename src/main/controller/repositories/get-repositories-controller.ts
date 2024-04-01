import { Handler } from '../../core/handler';
import { HttpResponse } from '../../../domain/protocols/http-response';
import { template } from '../../helpers/http-helpers';

export class GetRepositoriesController extends Handler {
  async handle(): Promise<HttpResponse> {
    const repositories = await this.repositoryRepository.list();
    const users = await this.userRepository.list();
    const content = await this.templateRenderer.render('repositories', {
      page: {
        current: 'repositories'
      },
      repositories,
      users
    });
    return template(content);
  }
}
