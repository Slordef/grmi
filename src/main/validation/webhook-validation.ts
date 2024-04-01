import { Validation } from '../../domain/validation/validation';
import { verifySecret } from 'verify-github-webhook-secret';
import { ValidWebhook } from '../../domain/params/webhook';

export class WebhookValidation implements Validation {
  async validate(input: unknown): Promise<Error | undefined> {
    const inputParsed = ValidWebhook.safeParse(input);
    if (!inputParsed.success) {
      return new Error('Validation fail');
    }
    const { body, secret, signature } = inputParsed.data;
    if (await verifySecret(body, secret, signature)) {
      return undefined;
    }
    return new Error('Invalid signature');
  }
}
