import { Repository } from '../../../../domain/models/repository';
import { FileManager } from '../file-manager';
import { RepositoryRepository } from '../../../../domain/usecases/repository/repository-repository';

export class RepositoryFileRepository implements RepositoryRepository {
  async import(): Promise<Repository[]> {
    const data = await FileManager.read<Repository[]>('repositories.json').catch(() => []);
    return data.filter((repo: Repository) => Repository.safeParse(repo).success);
  }

  async create(value: Repository): Promise<Repository> {
    const repositoryParse = Repository.safeParse(value);
    if (!repositoryParse.success) {
      throw new Error('Repository invalid');
    }
    if (!(await FileManager.exists('repositories.json'))) {
      await FileManager.write('repositories.json', [value]);
      return value;
    } else {
      const list = await this.import();
      list.push(value);
      await FileManager.write('repositories.json', list);
      return value;
    }
  }

  async get(id: number): Promise<Repository | null> {
    const list = await this.import();
    const data = list.find((repository) => repository.id === id);
    const repositoryParse = Repository.safeParse(data);
    if (!repositoryParse.success) {
      return null;
    }
    return repositoryParse.data;
  }

  async update(repository: Partial<Repository>): Promise<Repository | null> {
    const list = await this.import();
    const index = list.findIndex((d) => d.id === repository.id);
    if (index === -1) {
      return null;
    }
    const data = list[index];
    const repositoryParse = Repository.safeParse(data);
    if (!repositoryParse.success) {
      return null;
    }
    list[index] = { ...data, ...repository };
    await FileManager.write('repositories.json', list);
    return list[index];
  }

  async delete(id: number): Promise<boolean> {
    const list = await this.import();
    const index = list.findIndex((d) => d.id === id);
    if (index === -1) {
      return false;
    }
    list.splice(index, 1);
    await FileManager.write('repositories.json', list);
    return true;
  }

  async list(): Promise<Repository[]> {
    return this.import();
  }
}
