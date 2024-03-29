import { Validation } from '../../domain/usecases/validation';
import { verifySecret } from 'verify-github-webhook-secret';
import { ValidWebhook } from '../../domain/params/webhook';

export class WebhookValidation implements Validation {
  async validate(input: unknown): Promise<Error | undefined> {
    try {
      const inputParsed = ValidWebhook.parse(input);
      const { body, secret, signature } = inputParsed;
      if (await verifySecret(body, secret, signature)) {
        return undefined;
      }
      return new Error('Invalid signature');
    } catch (error) {
      return new Error('Validation fail');
    }
  }
}
