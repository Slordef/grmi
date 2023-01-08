import { IRepository } from '../interface/IRepository';
import { IWebhook } from '../interface/IWebhook';

export class Webhook {
    constructor(
        public repository: IRepository
    ) {
    }

    /**
     * Check if the webhook is valid
     * @param {any} body
     * @returns {boolean}
     * @memberof Webhook
     */
    static check(body: unknown): body is IWebhook {
        try {
            IWebhook.parse(body);
        } catch (e) {
            return false;
        }
        return true;
    }
}