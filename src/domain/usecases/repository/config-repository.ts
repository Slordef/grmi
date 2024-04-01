import { Config } from '../../models/config';

export interface ConfigRepository {
  create(value: Config): Promise<Config>;
  get(id: number): Promise<Config | null>;
  update(value: Partial<Config>): Promise<Config | null>;
  delete(id: number): Promise<boolean>;
  list(): Promise<Config[]>;
}
