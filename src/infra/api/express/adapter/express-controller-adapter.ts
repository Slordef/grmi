import { RequestHandler } from 'express';
import { HttpRequest } from '../../../../domain/protocols/http-request';
import { AppHandler } from '../../../../domain/core/app-handler';
import { extractCookies } from '../extract-cookies';

export class ExpressControllerAdapter {
  constructor(private readonly controller: AppHandler) {}
  handle: RequestHandler = async (req, res) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      headers: req.headers,
      method: req.method,
      params: req.params,
      query: req.query,
      cookies: extractCookies(req),
      user: req.user
    };
    const httpResponse = await this.controller.handle(httpRequest);
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode);
      if (httpResponse.cookies) {
        httpResponse.cookies.forEach((cookie) => {
          res.cookie(cookie.name, cookie.value, cookie.options);
        });
      }
      if (httpResponse.template) {
        res.send(httpResponse.body);
      } else {
        res.json(httpResponse.body);
      }
    } else if (httpResponse.statusCode === 302) {
      res.redirect(httpResponse.body as string);
    } else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.body });
    }
  };
}
