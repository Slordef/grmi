import { Handler } from '../../core/handler';
import { HttpRequest } from '../../../domain/protocols/http-request';
import { HttpResponse } from '../../../domain/protocols/http-response';
import { badRequest, template } from '../../helpers/http-helpers';
import { propInObject } from '../../helpers/prop-in-object';

export class GetRepositoryController extends Handler {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!propInObject<string>(httpRequest.params, 'id')) {
      return badRequest(new Error('Id is required'));
    }
    const users = await this.userRepository.list();
    if (httpRequest.params.id === 'new') {
      const content = await this.templateRenderer.render('repository', {
        page: {
          current: 'repositories'
        },
        repository: {
          id: '',
          name: '',
          owner: '',
          html_url: '',
          secret: '',
          userId: '',
          labels: []
        },
        users
      });
      return template(content);
    }
    const id = parseInt(httpRequest.params.id);
    const repository = await this.repositoryRepository.get(id);
    let success = undefined;
    if (propInObject(httpRequest.query, 'created') && httpRequest.query.created === 'true') {
      success = 'Repository created';
    }
    const content = await this.templateRenderer.render('repository', {
      page: {
        current: 'repositories'
      },
      success,
      repository,
      users
    });
    return template(content);
  }
}
