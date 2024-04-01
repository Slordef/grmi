import { Hasher } from '../../../domain/usecases/cryptography/hasher';
import { HashComparer } from '../../../domain/usecases/cryptography/hash-comparer';
import bcrypt from 'bcrypt';

export class BcryptAdapter implements Hasher, HashComparer {
  async hash(plaintext: string): Promise<string> {
    const salt = 12;
    return bcrypt.hash(plaintext, salt);
  }
  async compare(plaintext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaintext, digest);
  }
}
