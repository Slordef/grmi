import { Repository } from '../../models/repository';

export interface RepositoryRepository {
  create(value: Repository): Promise<Repository>;
  get(id: number): Promise<Repository>;
  update(value: Partial<Repository>): Promise<Repository>;
  delete(id: number): Promise<boolean>;
  list(): Promise<Repository[]>;
}
