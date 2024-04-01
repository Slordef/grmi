import { Config } from '../../models/config';

export interface ConfigRepository {
  create(value: Config): Promise<Config>;
  get(id: number): Promise<Config>;
  update(value: Partial<Config>): Promise<Config>;
  delete(id: number): Promise<boolean>;
  list(): Promise<Config[]>;
}
