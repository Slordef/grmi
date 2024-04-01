import { RequestHandler } from 'express';
import { AppHandler } from '../../../../domain/core/app-handler';
import { HttpRequest } from '../../../../domain/protocols/http-request';
import { extractCookies } from '../extract-cookies';

export class ExpressMiddlewareAdapter {
  constructor(private readonly middleware: AppHandler) {}

  handle: RequestHandler = async (req, res, next) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      headers: req.headers,
      method: req.method,
      params: req.params,
      query: req.query,
      cookies: extractCookies(req),
      user: req.user
    };
    const httpResponse = await this.middleware.handle(httpRequest);
    if (httpResponse.statusCode === 200) {
      req.body = Object.assign(req.body, httpResponse.body);
      next();
    } else if (httpResponse.statusCode === 302) {
      res.redirect(httpResponse.body as string);
    } else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.body });
    }
  };
}
