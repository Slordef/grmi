import { RequestHandler } from 'express';
import { HttpRequest } from '../../../../domain/protocols/http-request';
import { Controller } from '../../../../domain/controller/controller';

export class ExpressControllerAdapter {
    constructor(private readonly controller: Controller) {
    }

    handle: RequestHandler = async (req, res) => {
        const httpRequest: HttpRequest = {
            body: req.body, headers: req.headers, method: req.method, params: req.params, query: req.query
        };
        const httpResponse = await this.controller.handle(httpRequest);
        if (httpResponse.statusCode === 200) {
            res.status(httpResponse.statusCode).json(httpResponse.body);
        } else {
            res.status(httpResponse.statusCode).json({ error: httpResponse.body });
        }
    };
}