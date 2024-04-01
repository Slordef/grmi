import { RequestHandler } from 'express';
import { HttpRequest } from '../../../../domain/protocols/http-request';
import { AppHandler } from '../../../../domain/core/app-handler';

export class ExpressControllerAdapter {
  constructor(private readonly controller: AppHandler) {}

  handle: RequestHandler = async (req, res) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      headers: req.headers,
      method: req.method,
      params: req.params,
      query: req.query
    };
    const httpResponse = await this.controller.handle(httpRequest);
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.body });
    }
  };
}
