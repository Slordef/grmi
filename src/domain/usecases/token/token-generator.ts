export interface TokenGenerator {
  generate: (plaintext: string, expiresIn?: string) => Promise<string>;
}
