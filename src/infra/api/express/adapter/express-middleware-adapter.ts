import { RequestHandler } from 'express';
import { AppHandler } from '../../../../domain/core/app-handler';

export class ExpressMiddlewareAdapter {
  constructor(private readonly middleware: AppHandler) {}

  handle: RequestHandler = async (req, res, next) => {
    const httpRequest = {
      body: req.body,
      headers: req.headers,
      method: req.method,
      params: req.params,
      query: req.query
    };
    const httpResponse = await this.middleware.handle(httpRequest);
    if (httpResponse.statusCode === 200) {
      req.body = Object.assign(req.body, httpResponse.body);
      next();
    } else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.body });
    }
  };
}
