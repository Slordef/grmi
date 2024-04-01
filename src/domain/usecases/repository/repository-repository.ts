import { Repository } from '../../models/repository';

export interface RepositoryRepository {
  create(value: Repository): Promise<Repository>;
  get(id: number): Promise<Repository | null>;
  update(value: Partial<Repository>): Promise<Repository | null>;
  delete(id: number): Promise<boolean>;
  list(): Promise<Repository[]>;
}
