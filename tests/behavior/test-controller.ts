import { Controller } from '../../src/domain/controller/controller';
import { badGateway, ok } from '../../src/main/helpers/http-helpers';
import { HttpRequest } from '../../src/domain/protocols/http-request';
import { HttpResponse } from '../../src/domain/protocols/http-response';

export class TestController implements Controller {
    readonly method = 'get';
    readonly middlewares = [];
    readonly path = '/test';

    constructor(private readonly mock = jest.fn(), private readonly resolve: boolean = true) {
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        this.mock(request);
        if (this.resolve) return ok({});
        return badGateway(new Error('test'));
    }
}