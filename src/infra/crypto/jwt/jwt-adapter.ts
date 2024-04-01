import { TokenGenerator } from '../../../domain/usecases/token/token-generator';
import { TokenVerifier } from '../../../domain/usecases/token/token-verifier';
import jwt from 'jsonwebtoken';
import { env } from '../../../main/config';

export class JwtAdapter implements TokenGenerator, TokenVerifier {
  async verify(ciphertext: string): Promise<string | Record<string, unknown>> {
    return jwt.verify(ciphertext, env.JWT_SECRET);
  }
  async generate(plaintext: string, expiresIn?: string): Promise<string> {
    return jwt.sign({ data: plaintext }, env.JWT_SECRET, { expiresIn });
  }
}
