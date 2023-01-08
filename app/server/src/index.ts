import dotenv from 'dotenv';
import { Core } from './domain/core/Core';
import { Express } from './infra/endpoints/express/init';
import { AxiosRequest } from './infra/requests/axios/init';
import { ConfigFile } from './infra/database/configfile/init';

dotenv.config({ path: '../../.env' });
const app = new Core(
    Express,
    AxiosRequest,
    ConfigFile
);
app.start();
