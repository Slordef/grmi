export interface TokenGenerator {
  generate: (plaintext: string) => Promise<string>;
}
