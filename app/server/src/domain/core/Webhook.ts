import { IWebhook } from '../interface/IWebhook';

/**
 * Performs operations on webhooks.
 * Used with static methods.
 * @class
 */
export class Webhook {
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

    // check secret with https://www.npmjs.com/package/verify-github-webhook-secret?activeTab=readme
}