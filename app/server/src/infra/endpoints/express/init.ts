import express from 'express';
import { CorePlugin } from '../../../domain/core/CorePlugin';
import { PluginRegister } from '../../../domain/core/Core';
import { Webhook } from '../../../domain/core/Webhook';
import { Endpoint } from '../../../domain/core/Endpoint';
import { EventEndpointWebhook } from '../../../domain/events/EventEndpointWebhook';

export class Express extends CorePlugin {

    install({ gateway }: PluginRegister) {
        const app = express();
        const port = process.env.PORT || 3000;

        app.use(express.json());

        app.get('*', (req, res) => {
            console.log(req);
            res.send('App is running');
        });

        app.post('/webhook', (req, res) => {
            const now = new Date().getTime();
            if (Webhook.check(req.body)) {
                const endpoint = new Endpoint(now, req.url, req.method, req.body);
                gateway.send(new EventEndpointWebhook(endpoint));
            }
            res.send('OK');
        });

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}