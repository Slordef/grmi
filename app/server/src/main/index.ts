import dotenv from 'dotenv';
import { Core } from './core/core';
import { ExpressPlugin } from '../infra/api/express';
import { ConfigfilePlugin } from '../infra/database/configfile';
import { AxiosPlugin } from '../infra/requests/axios';

dotenv.config({ path: '../../.env' });
const app = new Core(ExpressPlugin, ConfigfilePlugin, AxiosPlugin);
app.run();
