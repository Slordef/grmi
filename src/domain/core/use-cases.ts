import { ApiServer } from '../usecases/api-server/api-server';
import { Fetcher } from '../usecases/fetcher/fetcher';
import { UserRepository } from '../usecases/repository/user-repository';
import { RepositoryRepository } from '../usecases/repository/repository-repository';
import { Hasher } from '../usecases/cryptography/hasher';
import { HashComparer } from '../usecases/cryptography/hash-comparer';
import { TokenGenerator } from '../usecases/token/token-generator';
import { TokenVerifier } from '../usecases/token/token-verifier';
import { RunManager } from '../usecases/runner/run-manager';
import { ConfigRepository } from '../usecases/repository/config-repository';

export interface UseCases {
  Test: () => string;
  ApiServer: ApiServer;
  Hasher: Hasher;
  HashComparer: HashComparer;
  TokenGenerator: TokenGenerator;
  TokenVerifier: TokenVerifier;
  Fetcher: Fetcher;
  UserRepository: UserRepository;
  RepositoryRepository: RepositoryRepository;
  ConfigRepository: ConfigRepository;
  RunManager: RunManager;
}
