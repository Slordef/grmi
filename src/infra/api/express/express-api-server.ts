import { ApiServer } from '../../../domain/usecases/api-server/api-server';
import express, { Express } from 'express';
import { ExpressControllerAdapter } from './adapter/express-controller-adapter';
import { ExpressMiddlewareAdapter } from './adapter/express-middleware-adapter';
import { log } from '../../../main/helpers/logger';
import { env } from '../../../main/config';
import { AppRoute } from '../../../domain/route/app-route';
import path from 'path';

export class ExpressApiServer implements ApiServer {
  private app: Express;
  private port: string;

  constructor() {
    this.app = express();
    this.port = env.PORT;

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(path.resolve(env.BASE_SRC, 'templates', 'public')));
  }

  start(): Promise<void> {
    this.app.all('*', (req, res) => {
      // log('all', req, 'all');
      res.send('App is running');
    });

    this.app.listen(this.port, () => {
      log(`Server is running on port ${this.port}`);
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
