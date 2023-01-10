import { IWebhook } from '../interface/IWebhook';
import { verifySecret } from 'verify-github-webhook-secret';

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

    /**
     * Verify the webhook signature with the secret
     * @param {IWebhook} body
     * @param {string} body
     * @param {string} secret
     * @param {string} signature
     * @returns {boolean}
     */
    static async verify(body: string, secret: string, signature: string): Promise<boolean> {
        return await verifySecret(body, secret, signature);
    }
}