/* eslint-disable @typescript-eslint/no-unused-vars */
import { Validation } from '../../src/domain/usecases/validation';

export class TestWebhookValidation implements Validation {
    constructor(
		private readonly error: () => (Error | undefined) = () => undefined
    ) {
    }

    async validate(input: unknown): Promise<Error | undefined> {
        return this.error();
    }
}