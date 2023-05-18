import { badGateway, ok } from '../../app/server/src/main/helpers/http-helpers';
import { HttpRequest } from '../../app/server/src/domain/protocols/http-request';
import { HttpResponse } from '../../app/server/src/domain/protocols/http-response';
import { Middleware } from '../../app/server/src/domain/controller/middleware';

export class TestMiddleware implements Middleware {
    constructor(private readonly mock = jest.fn(), private readonly resolve: boolean = true) {
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        this.mock(request);
        if (this.resolve) return ok({});
        return badGateway(new Error('test'));
    }
}