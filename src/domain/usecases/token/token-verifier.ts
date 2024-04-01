export interface TokenVerifier {
  verify: (ciphertext: string) => Promise<string | Record<string, unknown>>;
}
