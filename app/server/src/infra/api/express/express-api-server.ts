import { ApiServer } from '../../../domain/usecases/api-server';
import express, { Express } from 'express';
import { Controller } from '../../../domain/controller/controller';
import { ExpressControllerAdapter } from './adapter/express-controller-adapter';
import { ExpressMiddlewareAdapater } from './adapter/express-middleware-adapater';

export class ExpressApiServer implements ApiServer {
    private app: Express;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';

        this.app.use(express.json());

    }

    start(): Promise<void> {
        this.app.all('*', (req, res) => {
            console.log(req);
            res.send('App is running');
        });

        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });

        return Promise.resolve(undefined);
    }

    route(controller: Controller): void {
        const adapter = new ExpressControllerAdapter(controller);
        const middlewares = controller.middlewares.map(m => new ExpressMiddlewareAdapater(m).handle);
        this.app[controller.method](controller.path, ...middlewares, adapter.handle);
    }
}