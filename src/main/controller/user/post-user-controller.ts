import { Handler } from '../../core/handler';
import { HttpRequest } from '../../../domain/protocols/http-request';
import { HttpResponse } from '../../../domain/protocols/http-response';
import { badRequest, redirect, template } from '../../helpers/http-helpers';
import { propInObject } from '../../helpers/prop-in-object';
import { PostUser } from '../../../domain/params/post-user';

export class PostUserController extends Handler {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!propInObject<string>(httpRequest.params, 'id')) {
      return badRequest(new Error('Id is required'));
    }
    if (httpRequest.params.id === 'new') {
      const userParse = PostUser.safeParse(httpRequest.body);
      if (!userParse.success) {
        return badRequest(new Error('Invalid params'));
      }
      const userExists = await this.userRepository.get(parseInt(userParse.data.id));
      if (userExists) {
        return badRequest(new Error('User already exists'));
      }
      const user = await this.userRepository.create({
        ...userParse.data,
        id: parseInt(userParse.data.id)
      });
      return redirect(`/user/${user.id}`);
    }
    const id = parseInt(httpRequest.params.id);

    if (isNaN(id)) {
      return badRequest(new Error('Invalid id'));
    }

    if (propInObject(httpRequest.body, '_method')) {
      if (httpRequest.body._method === 'delete') {
        await this.userRepository.delete(id);
        return redirect('/users');
      }
    }

    const user = await this.userRepository.get(id);

    const content = await this.templateRenderer.render('user', {
      page: {
        current: 'users'
      },
      user
    });
    return template(content);
  }
}
