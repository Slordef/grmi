import { ApiServer } from '../../../domain/usecases/api-server/api-server';
import express, { Express } from 'express';
import { ExpressControllerAdapter } from './adapter/express-controller-adapter';
import { ExpressMiddlewareAdapter } from './adapter/express-middleware-adapter';
import { log } from '../../../main/helpers/logger';
import { env } from '../../../main/config';
import { AppRoute } from '../../../domain/route/app-route';

export class ExpressApiServer implements ApiServer {
  private app: Express;
  private port: number;
  private host: string;

  constructor() {
    this.app = express();
    this.port = parseInt(env.PORT);
    this.host = env.HOST;

    this.app.use(express.json());
  }

  start(): Promise<void> {
    this.app.all('*', (req, res) => {
      log(req);
      res.send('App is running');
    });

    this.app.listen(this.port, this.host, () => {
      log(`Server is running on ${this.host}:${this.port}`);
    });

    return Promise.resolve(undefined);
  }

  route(route: AppRoute): void {
    const adapter = new ExpressControllerAdapter(route.controller);
    const middlewares = route.middlewares.map(
      (middleware) => new ExpressMiddlewareAdapter(middleware).handle
    );
    this.app[route.method](route.path, ...middlewares, adapter.handle);
  }
}
