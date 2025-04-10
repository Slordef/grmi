import { AppCorePlugin } from '../../../../src/domain/core/app-core-plugin';
import { AppCorePluginManager } from '../../../../src/domain/core/app-core-plugin-manager';
import {
  TestCryptographyHashComparer,
  TestCryptographyHasher,
  TestCryptographyTokenGenerator,
  TestCryptographyTokenVerifier
} from './test-cryptography';

export function createTestCryptographyHasherPlugin(
  mock: jest.Mock<Promise<string>, [plaintext: string]> = jest.fn(),
  cryptography = TestCryptographyHasher
): {
  new (): AppCorePlugin;
} {
  class TestCryptographyHasherPlugin implements AppCorePlugin {
    install(manager: AppCorePluginManager): void {
      manager.register('Hasher', new cryptography(mock));
    }
  }
  return TestCryptographyHasherPlugin;
}

export function createTestCryptographyHashComparerPlugin(
  mock: jest.Mock<Promise<boolean>, [plaintext: string, digest: string]> = jest.fn(),
  cryptography = TestCryptographyHashComparer
): {
  new (): AppCorePlugin;
} {
  class TestCryptographyHashComparerPlugin implements AppCorePlugin {
    install(manager: AppCorePluginManager): void {
      manager.register('HashComparer', new cryptography(mock));
    }
  }
  return TestCryptographyHashComparerPlugin;
}

export function createTestCryptographyTokenGeneratorPlugin(
  mock: jest.Mock<Promise<string>, [plaintext: string]> = jest.fn(),
  cryptography = TestCryptographyTokenGenerator
): {
  new (): AppCorePlugin;
} {
  class TestCryptographyTokenGeneratorPlugin implements AppCorePlugin {
    install(manager: AppCorePluginManager): void {
      manager.register('TokenGenerator', new cryptography(mock));
    }
  }
  return TestCryptographyTokenGeneratorPlugin;
}

export function createTestCryptographyTokenVerifierPlugin(
  mock: jest.Mock<Promise<string | Record<string, unknown>>, [ciphertext: string]> = jest.fn(),
  cryptography = TestCryptographyTokenVerifier
): {
  new (): AppCorePlugin;
} {
  class TestCryptographyTokenVerifierPlugin implements AppCorePlugin {
    install(manager: AppCorePluginManager): void {
      manager.register('TokenVerifier', new cryptography(mock));
    }
  }
  return TestCryptographyTokenVerifierPlugin;
}
