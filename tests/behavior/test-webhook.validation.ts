import { Validation } from '../../app/server/src/domain/usecases/validation';

export class TestWebhookValidation implements Validation {
    constructor(
		private readonly error: () => (Error | undefined) = () => undefined
    ) {
    }

    async validate(input: any): Promise<Error | undefined> {
        return this.error();
    }
}