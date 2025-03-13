import { BcryptAdapter } from '../../../../src/infra/crypto/bcrypt/bcrypt-adapter';

describe('CryptoHash', () => {
  const bcryptAdapter = new BcryptAdapter();
  test('should return a hash on hash success', async () => {
    const hash = await bcryptAdapter.hash('any_value');
    expect(hash).toBeTruthy();
  });
  test('should return true on compare success', async () => {
    const hash = await bcryptAdapter.hash('any_value');
    const isValid = await bcryptAdapter.compare('any_value', hash);
    expect(isValid).toBe(true);
  });
  test('should return false on compare fail', async () => {
    const hash = await bcryptAdapter.hash('any_value');
    const isValid = await bcryptAdapter.compare('wrong_value', hash);
    expect(isValid).toBe(false);
  });
});
