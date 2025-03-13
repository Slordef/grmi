import { Hasher } from '../../../../src/domain/usecases/cryptography/hasher';
import { HashComparer } from '../../../../src/domain/usecases/cryptography/hash-comparer';
import { TokenGenerator } from '../../../../src/domain/usecases/token/token-generator';
import { TokenVerifier } from '../../../../src/domain/usecases/token/token-verifier';

export class TestCryptographyHasher implements Hasher {
  constructor(private readonly mock: jest.Mock<Promise<string>, [plaintext: string]>) {}
  async hash(plaintext: string): Promise<string> {
    return this.mock(plaintext);
  }
}
export class TestCryptographyHashComparer implements HashComparer {
  constructor(
    private readonly mock: jest.Mock<Promise<boolean>, [plaintext: string, digest: string]>
  ) {}
  async compare(plaintext: string, digest: string): Promise<boolean> {
    return this.mock(plaintext, digest);
  }
}
export class TestCryptographyTokenGenerator implements TokenGenerator {
  constructor(private readonly mock: jest.Mock<Promise<string>, [plaintext: string]>) {}
  async generate(plaintext: string): Promise<string> {
    return this.mock(plaintext);
  }
}
export class TestCryptographyTokenVerifier implements TokenVerifier {
  constructor(
    private readonly mock: jest.Mock<
      Promise<string | Record<string, unknown>>,
      [ciphertext: string]
    >
  ) {}
  async verify(ciphertext: string): Promise<string | Record<string, unknown>> {
    return this.mock(ciphertext);
  }
}
