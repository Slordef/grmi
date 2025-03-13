import { UserRepository } from '../../../../src/domain/usecases/repository/user-repository';
import { User } from '../../../../src/domain/models/user';
import { RepositoryRepository } from '../../../../src/domain/usecases/repository/repository-repository';
import { Repository } from '../../../../src/domain/models/repository';

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
