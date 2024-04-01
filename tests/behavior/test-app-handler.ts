import { AppHandler } from '../../src/domain/core/app-handler';
import { HttpRequest } from '../../src/domain/protocols/http-request';
import { HttpResponse } from '../../src/domain/protocols/http-response';
import { badGateway, ok } from '../../src/main/helpers/http-helpers';

export class TestAppHandler implements AppHandler {
  constructor(
    private readonly mock = jest.fn(),
    private readonly resolve = true
  ) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    this.mock(request);
    if (this.resolve) return ok({});
    return badGateway(new Error('test'));
  }
}
