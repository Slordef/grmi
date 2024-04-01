import { AppHandler } from '../../domain/core/app-handler';
import { AppCore } from '../../domain/core/app-core';
import { ApiServer } from '../../domain/usecases/api-server/api-server';
import { Fetcher } from '../../domain/usecases/fetcher/fetcher';
import { RepositoryRepository } from '../../domain/usecases/repository/repository-repository';
import { UserRepository } from '../../domain/usecases/repository/user-repository';
import { RunManager } from '../../domain/usecases/runner/run-manager';
import { Hasher } from '../../domain/usecases/cryptography/hasher';
import { HashComparer } from '../../domain/usecases/cryptography/hash-comparer';
import { TokenGenerator } from '../../domain/usecases/token/token-generator';
import { TokenVerifier } from '../../domain/usecases/token/token-verifier';
import { HttpRequest } from '../../domain/protocols/http-request';
import { HttpResponse } from '../../domain/protocols/http-response';

export abstract class Handler implements AppHandler {
  protected apiServer: ApiServer;
  protected hasher: Hasher;
  protected hashComparer: HashComparer;
  protected tokenGenerator: TokenGenerator;
  protected tokenVerifier: TokenVerifier;
  protected fetcher: Fetcher;
  protected runManager: RunManager;
  protected userRepository: UserRepository;
  protected repositoryRepository: RepositoryRepository;

  constructor(core: AppCore) {
    this.apiServer = core.adapter('ApiServer');
    this.hasher = core.adapter('Hasher');
    this.hashComparer = core.adapter('HashComparer');
    this.tokenGenerator = core.adapter('TokenGenerator');
    this.tokenVerifier = core.adapter('TokenVerifier');
    this.fetcher = core.adapter('Fetcher');
    this.runManager = core.adapter('RunManager');
    this.userRepository = core.adapter('UserRepository');
    this.repositoryRepository = core.adapter('RepositoryRepository');
  }

  abstract handle(request: HttpRequest): Promise<HttpResponse>;
}
