import { Repository } from '../../params/repository';

export interface RepositoryRepository {
  create(value: Repository): Promise<Repository>;
  get(id: number): Promise<Repository>;
  update(value: Repository): Promise<Repository>;
  delete(id: number): Promise<boolean>;
  list(): Promise<Repository[]>;
}
