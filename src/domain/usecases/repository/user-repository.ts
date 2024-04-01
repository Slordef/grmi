import { User } from '../../models/user';

export interface UserRepository {
  create(value: User): Promise<User>;
  get(id: number): Promise<User | null>;
  update(value: Partial<User>): Promise<User | null>;
  delete(id: number): Promise<boolean>;
  list(): Promise<User[]>;
}
