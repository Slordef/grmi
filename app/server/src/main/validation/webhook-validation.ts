import { Validation } from '../../domain/usecases/validation';
import { verifySecret } from 'verify-github-webhook-secret';

export class WebhookValidation implements Validation {
    async validate(input: any): Promise<Error | undefined> {
        const { body, secret, signature } = input;
        if (await verifySecret(body, secret, signature)) {
            return undefined;
        }
        return new Error('Invalid signature');
    }
}