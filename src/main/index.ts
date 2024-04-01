import { AppCore } from '../domain/core/app-core';
import { ExpressPlugin } from '../infra/api/express';
import { ConfigfilePlugin } from '../infra/database/configfile';
import { AxiosPlugin } from '../infra/requests/axios';
import { ApplicationCore } from './core/application-core';
import { BcryptPlugin } from '../infra/crypto/bcrypt/bcrypt-plugin';
import { JwtPlugin } from '../infra/crypto/jwt/jwt-plugin';
import { routes } from './routes/routes';

const app: AppCore = new ApplicationCore(
  ExpressPlugin,
  ConfigfilePlugin,
  AxiosPlugin,
  BcryptPlugin,
  JwtPlugin
);
app.run(routes);
