export interface Validation {
	validate(input: unknown): Promise<Error | undefined>;
}