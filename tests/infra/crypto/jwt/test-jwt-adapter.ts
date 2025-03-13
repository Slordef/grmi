import { JwtAdapter } from '../../../../src/infra/crypto/jwt/jwt-adapter';

describe('JwtAdapter', () => {
  const jwtAdapter = new JwtAdapter();
  test('should return a token on sign success', async () => {
    const token = await jwtAdapter.generate('any_id');
    expect(token).toBeTruthy();
  });
  test('should return a value on verify success', async () => {
    const token = await jwtAdapter.generate('any_id');
    const value = await jwtAdapter.verify(token);
    expect(value).toBe('any_id');
  });
  test('should return null on verify fail', async () => {
    const value = await jwtAdapter.verify('invalid_token');
    expect(value).toBeNull();
  });
});
