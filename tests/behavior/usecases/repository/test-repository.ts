import { UserRepository } from '../../../../src/domain/usecases/repository/user-repository';
import { User } from '../../../../src/domain/models/user';
import { jest } from '@jest/globals';
import { RepositoryRepository } from '../../../../src/domain/usecases/repository/repository-repository';
import { Repository } from '../../../../src/domain/models/repository';
import { ConfigRepository } from '../../../../src/domain/usecases/repository/config-repository';
import { Config } from '../../../../src/domain/models/config';

export class TestUserRepository implements UserRepository {
  constructor(private readonly mock: jest.Mock) {}
  async create(value: User): Promise<User> {
    return this.mock(value) as User;
  }
  async get(id: number): Promise<User> {
    return this.mock(id) as User;
  }
  async update(value: User): Promise<User> {
    return this.mock(value) as User;
  }
  async delete(id: number): Promise<boolean> {
    return this.mock(id) as boolean;
  }
  async list(): Promise<User[]> {
    return this.mock() as User[];
  }
}

export class TestRepositoryRepository implements RepositoryRepository {
  constructor(private readonly mock: jest.Mock) {}
  async create(value: Repository): Promise<Repository> {
    return this.mock(value) as Repository;
  }
  async get(id: number): Promise<Repository> {
    return this.mock(id) as Repository;
  }
  async update(value: Repository): Promise<Repository> {
    return this.mock(value) as Repository;
  }
  async delete(id: number): Promise<boolean> {
    return this.mock(id) as boolean;
  }
  async list(): Promise<Repository[]> {
    return this.mock() as Repository[];
  }
}

export class TestConfigRepository implements ConfigRepository {
  constructor(private readonly mock: jest.Mock) {}
  async create(value: Config): Promise<Config> {
    return this.mock(value) as Config;
  }
  async get(id: number): Promise<Config> {
    return this.mock(id) as Config;
  }
  async update(value: Config): Promise<Config> {
    return this.mock(value) as Config;
  }
  async delete(id: number): Promise<boolean> {
    return this.mock(id) as boolean;
  }
  async list(): Promise<Config[]> {
    return this.mock() as Config[];
  }
}
