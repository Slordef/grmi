import { Handler } from '../../core/handler';
import { HttpRequest } from '../../../domain/protocols/http-request';
import { HttpResponse } from '../../../domain/protocols/http-response';
import { badRequest, redirect, template } from '../../helpers/http-helpers';
import { propInObject } from '../../helpers/prop-in-object';
import { PostRepository } from '../../../domain/params/post-repository';

export class PostRepositoryController extends Handler {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!propInObject<string>(httpRequest.params, 'id')) {
      return badRequest(new Error('Id is required'));
    }
    if (httpRequest.params.id === 'new') {
      const repoParse = PostRepository.safeParse(httpRequest.body);
      if (!repoParse.success) {
        return badRequest(new Error('Invalid params'));
      }
      const repoExists = await this.repositoryRepository.get(parseInt(repoParse.data.id));
      if (repoExists) {
        return badRequest(new Error('Repository already exists'));
      }
      const repository = await this.repositoryRepository.create({
        ...repoParse.data,
        id: parseInt(repoParse.data.id),
        userId: parseInt(repoParse.data.userId),
        labels: repoParse.data.labels.split(',').map((label) => label.trim())
      });
      return redirect(`/repository/${repository.id}`);
    }
    const id = parseInt(httpRequest.params.id);

    if (isNaN(id)) {
      return badRequest(new Error('Invalid id'));
    }

    if (propInObject(httpRequest.body, '_method')) {
      if (httpRequest.body._method === 'delete') {
        await this.repositoryRepository.delete(id);
        return redirect('/repositories');
      }
    }

    const repository = await this.repositoryRepository.get(id);
    const users = await this.userRepository.list();
    const content = await this.templateRenderer.render('repository', {
      page: {
        current: 'users'
      },
      repository,
      users
    });
    return template(content);
  }
}
