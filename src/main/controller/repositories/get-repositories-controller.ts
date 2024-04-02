import { Handler } from '../../core/handler';
import { HttpResponse } from '../../../domain/protocols/http-response';
import { template } from '../../helpers/http-helpers';
import { HttpRequest } from '../../../domain/protocols/http-request';
import { propInObject } from '../../helpers/prop-in-object';

export class GetRepositoriesController extends Handler {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const repositories = await this.repositoryRepository.list();
    const users = await this.userRepository.list();
    let success = undefined;
    if (propInObject(httpRequest.query, 'deleted') && httpRequest.query.deleted === 'true') {
      success = 'Repository deleted';
    }
    const content = await this.templateRenderer.render('repositories', {
      page: {
        current: 'repositories'
      },
      success,
      repositories,
      users
    });
    return template(content);
  }
}
